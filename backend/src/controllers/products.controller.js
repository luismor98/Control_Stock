import { db } from "../config/firebaseAdmin.js";

const COLLECTION = "products";

/**
 * GET /api/products
 * Obtiene todos los productos del usuario autenticado.
 */
export const getProducts = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

/**
 * POST /api/products
 * Crea un nuevo producto.
 * Body: { name, category, price, stock, supplier, ... }
 */
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    if (!productData.name) {
      return res
        .status(400)
        .json({ error: "El nombre del producto es requerido" });
    }

    const docRef = await db.collection(COLLECTION).add(productData);
    const newProduct = { id: docRef.id, ...productData };
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

/**
 * PUT /api/products/:id
 * Actualiza un producto existente por ID.
 * Body: campos a actualizar
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };
    delete updatedData.id; // No guardamos el id dentro del documento

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await docRef.update(updatedData);
    res.json({ id, ...updatedData });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

/**
 * DELETE /api/products/:id
 * Elimina un producto por ID.
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await docRef.delete();
    res.json({ id, message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
