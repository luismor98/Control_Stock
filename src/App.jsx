import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Toast from "./components/Toast";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./services/firestoreService";

const UNCATEGORIZED = {
  id: 0,
  name: "Sin categoría",
  description: "Categoría por defecto para productos sin asignar",
  protected: true,
};


const STOCK_THRESHOLD = 5;

const computeStats = (products) => ({
  totalProducts: products.length,
  totalUnits: products.reduce((sum, p) => sum + p.quantity, 0),
  totalValue: products.reduce((sum, p) => sum + p.price * p.quantity, 0),
  lowStockCount: products.filter(
    (p) => p.quantity <= STOCK_THRESHOLD && p.quantity > 0,
  ).length,
  outOfStockCount: products.filter((p) => p.quantity === 0).length,
});

const App = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(computeStats([]));
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [categories, setCategories] = useState([]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    // Ocultar automáticamente después de 3.5s
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        
        setProducts(fetchedProducts);
        
        // Aseguramos que la categoría "Sin categoría" siempre exista en el estado local
        // si no viene de Firebase.
        const hasUncategorized = fetchedCategories.some(c => c.name === UNCATEGORIZED.name);
        if (hasUncategorized) {
          setCategories(fetchedCategories);
        } else {
          setCategories([UNCATEGORIZED, ...fetchedCategories]);
        }
      } catch (error) {
        console.error("Error al cargar datos desde Firebase:", error);
        showToast("Error de conexión al cargar datos", "error");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    setStats(computeStats(products));
  }, [products]);

  const handleAddProduct = async (formData) => {
    try {
      const newProduct = await addProduct(formData);
      setProducts((prev) => [...prev, newProduct]);
      showToast("Producto agregado al inventario", "success");
    } catch (error) {
      console.error(error);
      showToast("Error al agregar producto", "error");
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct.id, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
      );
      showToast("Producto actualizado correctamente", "info");
    } catch (error) {
      console.error(error);
      showToast("Error al actualizar producto", "error");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Producto eliminado del sistema", "error");
    } catch (error) {
      console.error(error);
      showToast("Error al eliminar producto", "error");
    }
  };

  const handleAddCategory = async (formData) => {
    try {
      const newCategoryData = { ...formData, protected: false };
      const newCategory = await addCategory(newCategoryData);
      setCategories((prev) => [...prev, newCategory]);
      showToast("Categoría creada correctamente", "success");
    } catch (error) {
      console.error(error);
      showToast("Error al crear categoría", "error");
    }
  };

  const handleUpdateCategory = async (updatedCategory) => {
    try {
      await updateCategory(updatedCategory.id, updatedCategory);
      setCategories((prev) =>
        prev.map((c) =>
          c.id === updatedCategory.id
            ? { ...updatedCategory, protected: c.protected }
            : c,
        ),
      );
      showToast("Categoría actualizada correctamente", "info");
    } catch (error) {
      console.error(error);
      showToast("Error al actualizar categoría", "error");
    }
  };

  const handleDeleteCategory = async (id) => {
    const category = categories.find((c) => c.id === id);
    if (!category || category.protected) return;

    try {
      await deleteCategory(id);
      
      // Migrar productos de la categoría eliminada a "Sin categoría"
      // En Firestore:
      const productsToMigrate = products.filter(p => p.category === category.name);
      for (const p of productsToMigrate) {
        await updateProduct(p.id, { ...p, category: UNCATEGORIZED.name });
      }

      // En estado local:
      setProducts((prev) =>
        prev.map((p) =>
          p.category === category.name
            ? { ...p, category: UNCATEGORIZED.name }
            : p,
        ),
      );
      setCategories((prev) => prev.filter((c) => c.id !== id));
      
      showToast(
        `Categoría "${category.name}" eliminada. Sus productos pasaron a "Sin categoría".`,
        "error",
      );
    } catch (error) {
      console.error(error);
      showToast("Error al eliminar categoría", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center gap-4 transition-colors duration-300">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Control Stock
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-600 mt-1">
            Cargando inventario...
          </p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <MainLayout
        currentView={currentView}
        setCurrentView={setCurrentView}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        products={products}
        stats={stats}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        categories={categories}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      {/* Sistema global de notificaciones */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default App;
