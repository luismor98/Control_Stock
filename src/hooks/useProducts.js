import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addProductAsync,
  updateProductAsync,
  deleteProductAsync,
} from "../store/slices/productsSlice";
import { useUI } from "./useUI";
import { STOCK_THRESHOLD } from "../constants/inventory";
export const useProducts = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);
  const { triggerToast } = useUI();

  const isLoading = status === "loading";

  const loadProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const addProduct = useCallback(async (formData) => {
    try {
      await dispatch(addProductAsync(formData)).unwrap();
      triggerToast("Producto agregado al inventario", "success");
    } catch (err) {
      console.error(err);
      triggerToast("Error al agregar producto", "error");
    }
  }, [dispatch, triggerToast]);

  const updateProduct = useCallback(async (updatedProduct) => {
    try {
      await dispatch(updateProductAsync(updatedProduct)).unwrap();
      triggerToast("Producto actualizado correctamente", "info");
    } catch (err) {
      console.error(err);
      triggerToast("Error al actualizar producto", "error");
    }
  }, [dispatch, triggerToast]);

  const deleteProduct = useCallback(async (id) => {
    try {
      await dispatch(deleteProductAsync(id)).unwrap();
      triggerToast("Producto eliminado del sistema", "error");
    } catch (err) {
      console.error(err);
      triggerToast("Error al eliminar producto", "error");
    }
  }, [dispatch, triggerToast]);

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
