import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import Toast from "./components/Toast";
import { useProducts } from "./hooks/useProducts";
import { useCategories } from "./hooks/useCategories";
import { useUI } from "./hooks/useUI";

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const { loadProducts, isLoading: productsLoading } = useProducts();
  const { loadCategories, isLoading: categoriesLoading } = useCategories();
  const { isDarkMode, toast, closeToast, initializeDarkMode } = useUI();

  const isLoading = productsLoading || categoriesLoading;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    // Inicializamos la carga de datos global
    initializeDarkMode(true); // O recuperar de localStorage si existiera
    loadProducts();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

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
      {/* Ya no pasamos todas las props hacia abajo; MainLayout consumirá lo que necesite del Store/Hooks */}
      <MainLayout />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />
    </>
  );
};

export default App;
