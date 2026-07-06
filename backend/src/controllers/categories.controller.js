import { db } from "../config/firebaseAdmin.js";

const COLLECTION = "categories";

/**
 * GET /api/categories
 * Obtiene todas las categorías.
 */
export const getCategories = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

/**
 * POST /api/categories
 * Crea una nueva categoría.
 * Body: { name, description }
 */
export const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;

    if (!categoryData.name) {
      return res
        .status(400)
        .json({ error: "El nombre de la categoría es requerido" });
    }

    const docRef = await db
      .collection(COLLECTION)
      .add({ ...categoryData, protected: false });
    const newCategory = { id: docRef.id, ...categoryData, protected: false };
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

/**
 * PUT /api/categories/:id
 * Actualiza una categoría existente.
 */
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };
    delete updatedData.id;

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    await docRef.update(updatedData);
    res.json({ id, ...updatedData });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

/**
 * DELETE /api/categories/:id
 * Elimina una categoría por ID.
 */
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    await docRef.delete();
    res.json({ id, message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};
