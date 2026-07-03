import { auth } from "../config/firebase";

const API_BASE = "/api";

const getAuthToken = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No hay sesión activa. Por favor inicia sesión.");
  }
  return currentUser.getIdToken(false);
};

const apiFetch = async (endpoint, options = {}) => {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Error ${response.status}: ${response.statusText}`,
    );
  }

  return response.json();
};

// ─── PRODUCTOS ────────────────────────────────────────────────────────────────

export const getProducts = () => apiFetch("/products");

export const addProduct = (productData) =>
  apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });

export const updateProduct = (id, updatedData) => {
  const dataToSend = { ...updatedData };
  delete dataToSend.id;
  return apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(dataToSend),
  });
};

export const deleteProduct = async (id) => {
  await apiFetch(`/products/${id}`, { method: "DELETE" });
  return id;
};

// ─── CATEGORÍAS ───────────────────────────────────────────────────────────────

export const getCategories = () => apiFetch("/categories");

export const addCategory = (categoryData) =>
  apiFetch("/categories", {
    method: "POST",
    body: JSON.stringify(categoryData),
  });

export const updateCategory = (id, updatedData) => {
  const dataToSend = { ...updatedData };
  delete dataToSend.id;
  return apiFetch(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(dataToSend),
  });
};

export const deleteCategory = async (id) => {
  await apiFetch(`/categories/${id}`, { method: "DELETE" });
  return id;
};

// ─── PROVEEDORES ──────────────────────────────────────────────────────────────

export const getSuppliers = () => apiFetch("/suppliers");

export const addSupplier = (supplierData) =>
  apiFetch("/suppliers", {
    method: "POST",
    body: JSON.stringify(supplierData),
  });

export const updateSupplier = (id, updatedData) => {
  const dataToSend = { ...updatedData };
  delete dataToSend.id;
  return apiFetch(`/suppliers/${id}`, {
    method: "PUT",
    body: JSON.stringify(dataToSend),
  });
};

export const deleteSupplier = async (id) => {
  await apiFetch(`/suppliers/${id}`, { method: "DELETE" });
  return id;
};
