import { db } from '../config/firebaseAdmin.js';

const COLLECTION = 'users';

/**
 * POST /api/auth/sync
 * Sincroniza al usuario en Firestore al iniciar sesión o registrarse.
 * Retorna el documento del usuario (incluyendo su rol).
 */
export const syncUser = async (req, res) => {
  try {
    const { uid, email, name } = req.user; // Esto viene de verifyToken

    const userRef = db.collection(COLLECTION).doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      // El usuario ya existe, devolvemos sus datos
      return res.json({ id: userDoc.id, ...userDoc.data() });
    }

    // El usuario no existe, lo creamos
    // Excepción temporal: si es el admin actual, le damos rol "admin"
    const isFirstAdmin = email === 'admin@controlstock.com';
    
    const newUser = {
      email,
      name: name || '',
      rol: isFirstAdmin ? 'admin' : 'operador',
      createdAt: new Date().toISOString()
    };

    await userRef.set(newUser);
    return res.status(201).json({ id: uid, ...newUser });

  } catch (error) {
    console.error('Error al sincronizar usuario:', error);
    res.status(500).json({ error: 'Error al sincronizar el usuario' });
  }
};
