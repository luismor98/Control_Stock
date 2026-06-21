import { useDispatch, useSelector } from "react-redux";
import { useUI } from "./useUI";
import {
  fetchSuppliers,
  addSupplierAsync,
  updateSupplierAsync,
  deleteSupplierAsync,
} from "../store/slices/suppliersSlice";

export const useSuppliers = () => {
  const dispatch = useDispatch();
  const {
    items: suppliers,
    status,
    error,
  } = useSelector((state) => state.suppliers);
  const { triggerToast } = useUI();

  const isLoading = status === "loading";

  const loadSuppliers = () => {
    dispatch(fetchSuppliers());
  };

  const addSupplier = async (supplierData) => {
    try {
      await dispatch(addSupplierAsync(supplierData)).unwrap();
      triggerToast("Proveedor registrado exitosamente", "success");
      return true;
    } catch (err) {
      console.error(err);
      triggerToast("Error al registrar proveedor", "error");
      return false;
    }
  };

  const updateSupplier = async (supplierData) => {
    try {
      await dispatch(updateSupplierAsync(supplierData)).unwrap();
      triggerToast("Proveedor actualizado exitosamente", "info");
      return true;
    } catch (err) {
      console.error(err);
      triggerToast("Error al actualizar proveedor", "error");
      return false;
    }
  };

  const deleteSupplier = async (id) => {
    try {
      await dispatch(deleteSupplierAsync(id)).unwrap();
      triggerToast("Proveedor eliminado exitosamente", "error");
      return true;
    } catch (err) {
      console.error(err);
      triggerToast("Error al eliminar proveedor", "error");
      return false;
    }
  };

  return {
    suppliers,
    isLoading,
    error,
    loadSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
  };
};
