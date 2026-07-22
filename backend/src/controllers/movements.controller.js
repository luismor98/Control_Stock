import { db } from "../config/firebaseAdmin.js";

const COLLECTION = "movements";

/**
 * GET /api/movements
 * Obtiene el historial de movimientos de inventario ordenado por fecha de creación (los más recientes primero).
 */
export const getMovements = async (req, res) => {
  try {
    const { startDate, endDate, product, type, user } = req.query;

    const snapshot = await db
      .collection(COLLECTION)
      .orderBy("date", "desc")
      .limit(1000) // Limitamos a 1000 para poder aplicar filtros dinámicos en memoria
      .get();

    let movements = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Aplicar filtros en memoria para evitar requerir índices complejos en Firebase
    if (startDate) {
      // Si mandan un ISO string completo o solo YYYY-MM-DD
      const start = new Date(startDate).getTime();
      movements = movements.filter((m) => new Date(m.date).getTime() >= start);
    }
    if (endDate) {
      const end = new Date(endDate).getTime();
      // Si el frontend envía YYYY-MM-DD, le sumamos 1 día. Si envía un ISO string con tiempo, no le sumamos nada extra.
      const isJustDate = endDate.length === 10; 
      const endLimit = isJustDate ? end + 86400000 : end;
      movements = movements.filter((m) => new Date(m.date).getTime() <= endLimit);
    }
    if (product) {
      movements = movements.filter((m) =>
        m.productName?.toLowerCase().includes(product.toLowerCase())
      );
    }
    if (type) {
      movements = movements.filter((m) => m.type === type);
    }
    if (user) {
      movements = movements.filter(
        (m) =>
          m.user?.name?.toLowerCase().includes(user.toLowerCase()) ||
          m.user?.email?.toLowerCase().includes(user.toLowerCase())
      );
    }

    // Limitamos la respuesta final para no enviar miles de registros al frontend de golpe
    res.json(movements.slice(0, 200));
  } catch (error) {
    console.error("Error al obtener el historial de movimientos:", error);
    res.status(500).json({ error: "Error al obtener el historial de movimientos" });
  }
};
