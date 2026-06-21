import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchCategories, 
  addCategoryAsync, 
  updateCategoryAsync, 
  deleteCategoryAsync 
} from '../store/slices/categoriesSlice';
import { migrateProductsCategoryAsync } from '../store/slices/productsSlice';
import { useUI } from './useUI';

export const useCategories = () => {
  const dispatch = useDispatch();
  const { items: categories, status, error } = useSelector((state) => state.categories);
  const { triggerToast } = useUI();

  const isLoading = status === 'loading';

  const loadCategories = () => {
    dispatch(fetchCategories());
  };

  const addCategory = async (formData) => {
    try {
      await dispatch(addCategoryAsync(formData)).unwrap();
      triggerToast("Categoría creada correctamente", "success");
    } catch (err) {
      console.error(err);
      triggerToast("Error al crear categoría", "error");
    }
  };

  const updateCategory = async (updatedCategory) => {
    try {
      await dispatch(updateCategoryAsync(updatedCategory)).unwrap();
      triggerToast("Categoría actualizada correctamente", "info");
    } catch (err) {
      console.error(err);
      triggerToast("Error al actualizar categoría", "error");
    }
  };

  const deleteCategory = async (id) => {
    const category = categories.find((c) => c.id === id);
    if (!category || category.protected) return;

    try {
      // 1. Migrate products first
      await dispatch(migrateProductsCategoryAsync(category.name)).unwrap();
      // 2. Delete the category
      await dispatch(deleteCategoryAsync(id)).unwrap();
      triggerToast(
        `Categoría "${category.name}" eliminada. Sus productos pasaron a "Sin categoría".`, 
        "error"
      );
    } catch (err) {
      console.error(err);
      triggerToast("Error al eliminar categoría", "error");
    }
  };

  return {
    categories,
    isLoading,
    error,
    loadCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
