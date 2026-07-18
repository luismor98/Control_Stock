import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { setAuthState } from "./store/slices/authSlice";

// Componentes y Layouts
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import SuppliersPage from "./pages/SuppliersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Toast from "./components/Toast";

// Hooks y Servicios
import { useProducts } from "./hooks/useProducts";
import { useCategories } from "./hooks/useCategories";
import { useSuppliers } from "./hooks/useSuppliers";
import { useUI } from "./hooks/useUI";
import { useAuth } from "./hooks/useAuth";
import * as apiService from "./services/apiService";

const App = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  const dispatch = useDispatch();

  const { loadProducts, isLoading: productsLoading } = useProducts();
  const { loadCategories, isLoading: categoriesLoading } = useCategories();
  const { loadSuppliers, isLoading: suppliersLoading } = useSuppliers();
  const { isDarkMode, toast, closeToast, initializeDarkMode } = useUI();

  const isLoadingData = productsLoading || categoriesLoading || suppliersLoading;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userData = await apiService.syncUser();
          dispatch(
            setAuthState({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || userData.name,
              rol: userData.rol,
            }),
          );
        } catch (error) {
          console.error("Error al sincronizar el usuario:", error);
          dispatch(setAuthState(null));
        }
      } else {
        dispatch(setAuthState(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    initializeDarkMode(true);
    if (isAuthenticated) {
      loadProducts();
      loadCategories();
      loadSuppliers();
    }
  }, [isAuthenticated, initializeDarkMode, loadProducts, loadCategories, loadSuppliers]);

  // Loading Screen Compartido
  const LoadingScreen = ({ text = "Cargando..." }) => (
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
        <p className="text-xs text-gray-500 dark:text-gray-600 mt-1">{text}</p>
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

  // Definición del Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/app/dashboard" replace /> : <LandingPage />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/app/dashboard" replace /> : <LoginPage />,
    },
    {
      path: "/register",
      element: isAuthenticated ? <Navigate to="/app/dashboard" replace /> : <RegisterPage />,
    },
    {
      path: "/app",
      element: <ProtectedRoute />,
      children: [
        {
          element: isLoadingData ? <LoadingScreen text="Cargando inventario..." /> : <MainLayout />,
          children: [
            { path: "", element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <DashboardPage /> },
            { path: "inventory", element: <InventoryPage /> },
            { path: "categories", element: <CategoriesPage /> },
            { path: "suppliers", element: <SuppliersPage /> },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />
    }
  ]);

  if (isInitializing) {
    return <LoadingScreen text="Conectando..." />;
  }

  return (
    <>
      <RouterProvider router={router} />
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
