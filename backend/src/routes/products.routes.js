import { Router } from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  migrateCategory,
} from '../controllers/products.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

// Todas las rutas de productos requieren autenticación
router.use(verifyToken);

router.put('/migrate-category', migrateCategory); // IMPORTANTE: debe ir antes de /:id
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
