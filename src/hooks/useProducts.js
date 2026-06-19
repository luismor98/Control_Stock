import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchProducts, 
  addProductAsync, 
  updateProductAsync, 
  deleteProductAsync 
} from '../store/slices/productsSlice';
import { showToast } from '../store/slices/uiSlice';

const STOCK_THRESHOLD = 5;

export const useProducts = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);

  const isLoading = status === 'loading';

  const loadProducts = () => {
    dispatch(fetchProducts());
  };

  const addProduct = async (formData) => {
    try {
      await dispatch(addProductAsync(formData)).unwrap();
      dispatch(showToast({ message: "Producto agregado al inventario", type: "success" }));
    } catch (err) {
      console.error(err);
      dispatch(showToast({ message: "Error al agregar producto", type: "error" }));
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      await dispatch(updateProductAsync(updatedProduct)).unwrap();
      dispatch(showToast({ message: "Producto actualizado correctamente", type: "info" }));
    } catch (err) {
      console.error(err);
      dispatch(showToast({ message: "Error al actualizar producto", type: "error" }));
    }
  };

  const deleteProduct = async (id) => {
    try {
      await dispatch(deleteProductAsync(id)).unwrap();
      dispatch(showToast({ message: "Producto eliminado del sistema", type: "error" }));
    } catch (err) {
      console.error(err);
      dispatch(showToast({ message: "Error al eliminar producto", type: "error" }));
    }
  };

  const stats = {
    totalProducts: products.length,
    totalUnits: products.reduce((sum, p) => sum + p.quantity, 0),
    totalValue: products.reduce((sum, p) => sum + p.price * p.quantity, 0),
    lowStockCount: products.filter(
      (p) => p.quantity <= STOCK_THRESHOLD && p.quantity > 0,
    ).length,
    outOfStockCount: products.filter((p) => p.quantity === 0).length,
  };

  return {
    products,
    stats,
    isLoading,
    error,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
