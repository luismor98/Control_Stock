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

    const batch = db.batch();
    const productRef = db.collection(COLLECTION).doc();
    
    batch.set(productRef, productData);

    // Registrar Kardex
    const movementRef = db.collection("movements").doc();
    batch.set(movementRef, {
      productId: productRef.id,
      productName: productData.name,
      type: "ENTRADA",
      reason: "Creación de producto",
      quantity: Number(productData.quantity || 0),
      previousStock: 0,
      newStock: Number(productData.quantity || 0),
      user: req.user,
      date: new Date().toISOString()
    });

    await batch.commit();

    const newProduct = { id: productRef.id, ...productData };
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
    const { reason, ...updatedData } = req.body; // Extraemos reason
    delete updatedData.id;

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const oldData = doc.data();
    const oldQty = Number(oldData.quantity || 0);
    const newQty = Number(updatedData.quantity !== undefined ? updatedData.quantity : oldQty);

    const batch = db.batch();
    batch.update(docRef, updatedData);

    // Registrar Kardex solo si cambió el stock
    if (oldQty !== newQty) {
      const diff = newQty - oldQty;
      const type = diff > 0 ? "ENTRADA" : "SALIDA";
      const movementRef = db.collection("movements").doc();
      batch.set(movementRef, {
        productId: id,
        productName: updatedData.name || oldData.name,
        type,
        reason: reason || "Actualización manual",
        quantity: Math.abs(diff),
        previousStock: oldQty,
        newStock: newQty,
        user: req.user,
        date: new Date().toISOString()
      });
    }

    await batch.commit();
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

    const oldData = doc.data();
    const batch = db.batch();
    
    batch.delete(docRef);

    // Registrar Kardex
    const movementRef = db.collection("movements").doc();
    batch.set(movementRef, {
      productId: id,
      productName: oldData.name,
      type: "SALIDA",
      reason: "Producto eliminado",
      quantity: Number(oldData.quantity || 0),
      previousStock: Number(oldData.quantity || 0),
      newStock: 0,
      user: req.user,
      date: new Date().toISOString()
    });

    await batch.commit();
    res.json({ id, message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

/**
 * PUT /api/products/migrate-category
 * Migra masivamente los productos de una categoría a otra.
 */
export const migrateCategory = async (req, res) => {
  try {
    const { oldCategory, newCategory } = req.body;

    if (!oldCategory || !newCategory) {
      return res
        .status(400)
        .json({ error: "oldCategory y newCategory son requeridos" });
    }

    const snapshot = await db
      .collection(COLLECTION)
      .where("category", "==", oldCategory)
      .get();

    if (snapshot.empty) {
      return res.json({
        message: "No se encontraron productos para migrar",
        count: 0,
        migratedProducts: [],
      });
    }

    const batch = db.batch();
    const migratedProducts = [];

    snapshot.docs.forEach((doc) => {
      const docRef = db.collection(COLLECTION).doc(doc.id);
      batch.update(docRef, { category: newCategory });

      migratedProducts.push({
        id: doc.id,
        ...doc.data(),
        category: newCategory,
      });
    });

    await batch.commit();

    res.json({
      message: "Migración completada con éxito",
      count: migratedProducts.length,
      migratedProducts,
    });
  } catch (error) {
    console.error("Error en migración de categoría:", error);
    res.status(500).json({ error: "Error al realizar la migración masiva" });
  }
};
