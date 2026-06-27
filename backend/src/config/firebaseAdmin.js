import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargar .env aquí porque en ESM los módulos importados se ejecutan
// ANTES que el código de index.js (donde normalmente iría dotenv.config)
dotenv.config({ path: resolve(__dirname, '../../.env') });

/**
 * Inicializa Firebase Admin SDK.
 *
 * Soporta dos métodos de autenticación:
 *  1. Archivo JSON del service account (FIREBASE_SERVICE_ACCOUNT_PATH en .env)
 *  2. Variables de entorno individuales (FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY)
 */
const initializeFirebaseAdmin = () => {
  // Evitar inicializar más de una vez
  if (admin.apps.length > 0) {
    return admin;
  }

  // Método 1: Archivo JSON del service account
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (serviceAccountPath) {
    const resolvedPath = resolve(__dirname, '../../', serviceAccountPath);
    const serviceAccount = JSON.parse(readFileSync(resolvedPath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase Admin inicializado con archivo service account');
    return admin;
  }

  // Método 2: Variables de entorno individuales
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error(
      '❌ Firebase Admin: Faltan credenciales.\n' +
      'Agrega FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY en backend/.env\n' +
      'O usa FIREBASE_SERVICE_ACCOUNT_PATH apuntando al JSON del service account.'
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      // Las variables de entorno escapan los \n — los restauramos aquí
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });

  console.log('✅ Firebase Admin inicializado con variables de entorno');
  return admin;
};

export const firebaseAdmin = initializeFirebaseAdmin();
export const db = firebaseAdmin.firestore();
export const authAdmin = firebaseAdmin.auth();
