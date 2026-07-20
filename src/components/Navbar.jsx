import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();

  const viewTitles = {
    "/app/dashboard": "Dashboard",
    "/app/inventory": "Gestión de Inventario",
    "/app/categories": "Gestión de Categorías",
    "/app/suppliers": "Gestión de Proveedores",
    "/app/movements": "Kardex de Movimientos",
  };

  const currentViewTitle = viewTitles[location.pathname] || "Dashboard";

  return (
    <header
      className="
      h-16 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 z-20
      bg-white dark:bg-gray-900/80 dark:backdrop-blur-md
      border-b border-gray-200 dark:border-white/5
      shadow-sm dark:shadow-none
      transition-colors duration-300
    "
    >
      
      <div className="flex items-center gap-3">
        
        <button
          id="sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Abrir menú"
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 flex-shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-none font-medium tracking-wider uppercase hidden sm:block">
            Control Stock
          </p>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight truncate transition-colors">
            {currentViewTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors capitalize">
            {user?.displayName || "Usuario"}
          </p>
          <p className="text-xs text-gray-500">
            {user?.rol === "admin" ? "Administrador" : "Operador"}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-purple-500/20 ring-2 ring-white/10 transition-all flex-shrink-0 uppercase">
            {user?.displayName ? user.displayName.substring(0, 2) : "US"}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

