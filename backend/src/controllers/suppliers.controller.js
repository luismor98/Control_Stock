import { db } from '../config/firebaseAdmin.js';

const COLLECTION = 'suppliers';

/**
 * GET /api/suppliers
 * Obtiene todos los proveedores.
 */
export const getSuppliers = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const suppliers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(suppliers);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
};

/**
 * POST /api/suppliers
 * Crea un nuevo proveedor.
 * Body: { name, email, phone, address, ... }
 */
export const createSupplier = async (req, res) => {
  try {
    const supplierData = req.body;

    if (!supplierData.razonSocial) {
      return res.status(400).json({ error: 'La razón social del proveedor es requerida' });
    }

    const docRef = await db.collection(COLLECTION).add(supplierData);
    const newSupplier = { id: docRef.id, ...supplierData };
    res.status(201).json(newSupplier);
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ error: 'Error al crear el proveedor' });
  }
};

/**
 * PUT /api/suppliers/:id
 * Actualiza un proveedor existente.
 */
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };
    delete updatedData.id;

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    await docRef.update(updatedData);
    res.json({ id, ...updatedData });
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
};

/**
 * DELETE /api/suppliers/:id
 * Elimina un proveedor por ID.
 */
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    await docRef.delete();
    res.json({ id, message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ error: 'Error al eliminar el proveedor' });
  }
};
