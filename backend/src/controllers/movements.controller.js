import { db } from "../config/firebaseAdmin.js";

const COLLECTION = "movements";

/**
 * GET /api/movements
 * Obtiene el historial de movimientos de inventario ordenado por fecha de creación (los más recientes primero).
 */
export const getMovements = async (req, res) => {
  try {
    const snapshot = await db
      .collection(COLLECTION)
      .orderBy("date", "desc")
      .limit(200) // Limitamos a los últimos 200 movimientos para no saturar
      .get();

    const movements = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(movements);
  } catch (error) {
    console.error("Error al obtener el historial de movimientos:", error);
    res.status(500).json({ error: "Error al obtener el historial de movimientos" });
  }
};
