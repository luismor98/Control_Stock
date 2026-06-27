import { authAdmin } from '../config/firebaseAdmin.js';

/**
 * Middleware de verificación de token JWT de Firebase.
 *
 * Extrae el Bearer token del header Authorization,
 * lo verifica con Firebase Admin SDK y adjunta
 * los datos del usuario en req.user para las rutas siguientes.
 *
 * Si el token es inválido o no está presente → 401 Unauthorized.
 */
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'No autorizado',
      message: 'Se requiere un token de autenticación (Bearer token)',
    });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await authAdmin.verifyIdToken(token);
    // Adjuntamos la info del usuario decodificada para usarla en los controllers
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email,
    };
    next();
  } catch (error) {
    console.error('Error verificando token:', error.message);
    return res.status(401).json({
      error: 'Token inválido',
      message: 'El token de autenticación expiró o no es válido',
    });
  }
};
