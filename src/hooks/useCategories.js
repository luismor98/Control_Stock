import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchCategories, 
  addCategoryAsync, 
  updateCategoryAsync, 
  deleteCategoryAsync 
} from '../store/slices/categoriesSlice';
import { migrateProductsCategoryAsync } from '../store/slices/productsSlice';
import { showToast } from '../store/slices/uiSlice';

export const useCategories = () => {
  const dispatch = useDispatch();
  const { items: categories, status, error } = useSelector((state) => state.categories);

  const isLoading = status === 'loading';

  const loadCategories = () => {
    dispatch(fetchCategories());
  };

  const addCategory = async (formData) => {
    try {
      await dispatch(addCategoryAsync(formData)).unwrap();
      dispatch(showToast({ message: "Categoría creada correctamente", type: "success" }));
    } catch (err) {
      console.error(err);
      dispatch(showToast({ message: "Error al crear categoría", type: "error" }));
    }
  };

  const updateCategory = async (updatedCategory) => {
    try {
      await dispatch(updateCategoryAsync(updatedCategory)).unwrap();
      dispatch(showToast({ message: "Categoría actualizada correctamente", type: "info" }));
    } catch (err) {
      console.error(err);
      dispatch(showToast({ message: "Error al actualizar categoría", type: "error" }));
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
      dispatch(showToast({ 
        message: `Categoría "${category.name}" eliminada. Sus productos pasaron a "Sin categoría".`, 
        type: "error" 
      }));
    } catch (err) {
      console.error(err);
      dispatch(showToast({ message: "Error al eliminar categoría", type: "error" }));
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
