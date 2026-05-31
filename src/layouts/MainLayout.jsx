import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";

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
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSetCurrentView = (view) => {
    setCurrentView(view);
    closeSidebar();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar
        currentView={currentView}
        setCurrentView={handleSetCurrentView}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar currentView={currentView} toggleSidebar={toggleSidebar} />

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
