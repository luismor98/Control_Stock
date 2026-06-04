import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración web de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8yrW8Aj5BEJ40XBmwfycL22oTDOnAaNY",
  authDomain: "control-stock-9dbd0.firebaseapp.com",
  projectId: "control-stock-9dbd0",
  storageBucket: "control-stock-9dbd0.firebasestorage.app",
  messagingSenderId: "881715306163",
  appId: "1:881715306163:web:06494dcd3b6db2c1169ac6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar y exportar Cloud Firestore
export const db = getFirestore(app);
