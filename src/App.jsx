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
import LoadingScreen from "./components/LoadingScreen";

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
