import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  logoutUser,
  clearError,
} from "../store/slices/authSlice";
import { useUI } from "./useUI";

/**
 * useAuth — Hook personalizado para gestionar la autenticación.
 *
 * ¿Por qué existe este hook?
 * ------------------------------------------------------------------
 * El patrón de "Custom Hook" nos permite encapsular TODA la lógica
 * de autenticación en un solo lugar. Los componentes de página
 * (LoginPage, RegisterPage, Navbar) solo llaman a funciones simples
 * como `login(credentials)` sin necesidad de saber cómo funciona
 * Redux por dentro. Esto se llama "Separación de Responsabilidades".
 *
 * Principios aplicados:
 *  - Single Responsibility: este hook solo se ocupa de auth.
 *  - DRY (Don't Repeat Yourself): la lógica de dispatch+unwrap+toast
 *    se escribe una sola vez aquí, no en cada componente.
 *  - Abstracción: los componentes no conocen la implementación interna.
 * ------------------------------------------------------------------
 *
 * @returns {{
 *   user: object|null,
 *   isAuthenticated: boolean,
 *   isLoading: boolean,
 *   error: string|null,
 *   login: (credentials: {email: string, password: string}) => Promise<boolean>,
 *   register: (userData: {name: string, email: string, password: string}) => Promise<boolean>,
 *   logout: () => Promise<void>,
 *   cleanAuthErrors: () => void
 * }}
 */
export const useAuth = () => {
  const dispatch = useDispatch();

  // Leemos el estado de auth directamente desde el Store de Redux.
  const { user, isAuthenticated, isLoading, isInitializing, error } = useSelector(
    (state) => state.auth
  );

  // Consumimos useUI para poder navegar entre vistas y mostrar toasts,
  // sin que los componentes tengan que importar y usar useUI por separado.
  const { triggerToast } = useUI();

  // ----------------------------------------------------------------
  // login
  // Intenta autenticar al usuario con sus credenciales.
  // Usa .unwrap() para convertir el resultado del Thunk en una
  // Promesa real que podamos manejar con try/catch.
  // ----------------------------------------------------------------
  const login = useCallback(
    async (credentials) => {
      try {
        await dispatch(loginUser(credentials)).unwrap();
        triggerToast("¡Bienvenido de nuevo! 👋", "success");
        // La navegación al dashboard la maneja App.jsx al detectar
        // que isAuthenticated cambió a true en el store.
        return true;
      } catch (err) {
        // El error ya está guardado en state.auth.error por el slice,
        // pero también mostramos un toast para feedback inmediato.
        triggerToast(err || "Credenciales incorrectas", "error");
        return false;
      }
    },
    [dispatch, triggerToast]
  );

  // ----------------------------------------------------------------
  // register
  // Crea una nueva cuenta de usuario.
  // ----------------------------------------------------------------
  const register = useCallback(
    async (userData) => {
      try {
        await dispatch(registerUser(userData)).unwrap();
        triggerToast("¡Cuenta creada exitosamente! 🎉", "success");
        return true;
      } catch (err) {
        triggerToast(err || "Error al crear la cuenta", "error");
        return false;
      }
    },
    [dispatch, triggerToast]
  );

  // ----------------------------------------------------------------
  // logout
  // Cierra la sesión del usuario y redirige a la landing page.
  // ----------------------------------------------------------------
  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      triggerToast("Sesión cerrada correctamente", "info");
      // setCurrentView cambia la vista en uiSlice. App.jsx detecta
      // que isAuthenticated es false y muestra la pantalla de auth.
    } catch {
      triggerToast("Error al cerrar sesión", "error");
    }
  }, [dispatch, triggerToast]);

  // ----------------------------------------------------------------
  // cleanAuthErrors
  // Limpia los errores del slice de auth. Útil al desmontar formularios
  // para que los mensajes de error no persistan al regresar.
  // ----------------------------------------------------------------
  const cleanAuthErrors = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // ----------------------------------------------------------------
  // Efecto de limpieza automático
  // Si el hook se usa en un componente que se desmonta (ej: LoginPage),
  // limpiamos el error automáticamente para no mostrar mensajes viejos.
  // useEffect con retorno de función = "cleanup function".
  // ----------------------------------------------------------------
  useEffect(() => {
    return () => {
      // Solo limpiamos si hay un error activo, para evitar dispatches
      // innecesarios que podrían causar re-renders.
      if (error) {
        dispatch(clearError());
      }
    };
    // Intencionalmente omitimos 'error' del array de dependencias
    // para que este efecto solo corra al montar/desmontar el componente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return {
    // Estado del usuario
    user,
    isAuthenticated,
    isLoading,
    isInitializing,
    error,

    // Acciones de autenticación
    login,
    register,
    logout,
    cleanAuthErrors,
  };
};
