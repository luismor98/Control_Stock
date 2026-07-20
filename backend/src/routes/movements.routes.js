import { Router } from "express";
import { getMovements } from "../controllers/movements.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

// Protegemos la ruta para que solo usuarios autenticados puedan ver el historial
router.get("/", verifyToken, getMovements);

export default router;
