import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addProductAsync,
  updateProductAsync,
  deleteProductAsync,
} from "../store/slices/productsSlice";
import { useUI } from "./useUI";

const STOCK_THRESHOLD = 5;

export const useProducts = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);
  const { triggerToast } = useUI();

  const isLoading = status === "loading";

  const loadProducts = () => {
    dispatch(fetchProducts());
  };

  const addProduct = async (formData) => {
    try {
      await dispatch(addProductAsync(formData)).unwrap();
      triggerToast("Producto agregado al inventario", "success");
    } catch (err) {
      console.error(err);
      triggerToast("Error al agregar producto", "error");
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      await dispatch(updateProductAsync(updatedProduct)).unwrap();
      triggerToast("Producto actualizado correctamente", "info");
    } catch (err) {
      console.error(err);
      triggerToast("Error al actualizar producto", "error");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await dispatch(deleteProductAsync(id)).unwrap();
      triggerToast("Producto eliminado del sistema", "error");
    } catch (err) {
      console.error(err);
      triggerToast("Error al eliminar producto", "error");
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
