import { useDispatch, useSelector } from 'react-redux';
import { useUI } from './useUI';
import {
  setSuppliers,
  addSupplier as addSupplierAction,
  updateSupplier as updateSupplierAction,
  deleteSupplier as deleteSupplierAction,
  setLoading,
  setError
} from '../store/slices/suppliersSlice';

// Datos de prueba iniciales
const mockSuppliers = [];

export const useSuppliers = () => {
  const dispatch = useDispatch();
  const { items: suppliers, isLoading, error } = useSelector((state) => state.suppliers);
  const { showToast } = useUI();

  const loadSuppliers = async () => {
    dispatch(setLoading(true));
    try {
      // Simulando llamada a API
      await new Promise(resolve => setTimeout(resolve, 800));
      dispatch(setSuppliers(mockSuppliers));
    } catch (err) {
      dispatch(setError('Error al cargar proveedores'));
      showToast('Error al cargar proveedores', 'error');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addSupplier = async (supplierData) => {
    try {
      const newSupplier = {
        ...supplierData,
        id: `supp_${Date.now()}`
      };
      
      // Simulando guardado en DB
      dispatch(addSupplierAction(newSupplier));
      showToast('Proveedor registrado exitosamente', 'success');
      return true;
    } catch (err) {
      showToast('Error al registrar proveedor', 'error');
      return false;
    }
  };

  const updateSupplier = async (supplierData) => {
    try {
      // Simulando actualización en DB
      dispatch(updateSupplierAction(supplierData));
      showToast('Proveedor actualizado exitosamente', 'success');
      return true;
    } catch (err) {
      showToast('Error al actualizar proveedor', 'error');
      return false;
    }
  };

  const deleteSupplier = async (id) => {
    try {
      // Simulando eliminación en DB
      dispatch(deleteSupplierAction(id));
      showToast('Proveedor eliminado exitosamente', 'success');
      return true;
    } catch (err) {
      showToast('Error al eliminar proveedor', 'error');
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
    deleteSupplier
  };
};
