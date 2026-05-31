import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";

// Layout principal — gestiona el sidebar (abierto/cerrado) + modo oscuro
const MainLayout = ({
  currentView,
  setCurrentView,
  isDarkMode,
  setIsDarkMode,
  products,
  stats,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  // Estado de visibilidad del Sidebar (oculto por defecto en móvil)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Al navegar en móvil, cerramos el sidebar automáticamente
  const handleSetCurrentView = (view) => {
    setCurrentView(view);
    closeSidebar();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      {/* ── Overlay oscuro en móvil cuando el sidebar está abierto ── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <Sidebar
        currentView={currentView}
        setCurrentView={handleSetCurrentView}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* ── Columna principal: Navbar + contenido ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar currentView={currentView} toggleSidebar={toggleSidebar} />

        {/* Área de contenido dinámica con scroll */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
          {currentView === "dashboard" && (
            <DashboardPage
              products={products}
              stats={stats}
              setCurrentView={setCurrentView}
            />
          )}
          {currentView === "inventory" && (
            <InventoryPage
              products={products}
              onAddProduct={onAddProduct}
              onUpdateProduct={onUpdateProduct}
              onDeleteProduct={onDeleteProduct}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
