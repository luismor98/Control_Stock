import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Referencias a las colecciones
const productsCollection = collection(db, "products");
const categoriesCollection = collection(db, "categories");

// --- PRODUCTOS ---

export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (productData) => {
  const docRef = await addDoc(productsCollection, productData);
  return { id: docRef.id, ...productData };
};

export const updateProduct = async (id, updatedData) => {
  const productRef = doc(db, "products", id);
  // Removemos el id del updatedData para no guardarlo duplicado en el documento
  const dataToUpdate = { ...updatedData };
  delete dataToUpdate.id;
  await updateDoc(productRef, dataToUpdate);
  return updatedData;
};

export const deleteProduct = async (id) => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
  return id;
};

// --- CATEGORÍAS ---

export const getCategories = async () => {
  const snapshot = await getDocs(categoriesCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addCategory = async (categoryData) => {
  const docRef = await addDoc(categoriesCollection, categoryData);
  return { id: docRef.id, ...categoryData };
};

export const updateCategory = async (id, updatedData) => {
  const categoryRef = doc(db, "categories", id);
  const dataToUpdate = { ...updatedData };
  delete dataToUpdate.id;
  await updateDoc(categoryRef, dataToUpdate);
  return updatedData;
};

export const deleteCategory = async (id) => {
  const categoryRef = doc(db, "categories", id);
  await deleteDoc(categoryRef);
  return id;
};
