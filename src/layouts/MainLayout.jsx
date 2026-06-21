import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";
import CategoriesPage from "../pages/CategoriesPage";
import SuppliersPage from "../pages/SuppliersPage";
import { useUI } from "../hooks/useUI";

const MainLayout = () => {
  const { currentView, setCurrentView } = useUI();
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
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        handleSetCurrentView={handleSetCurrentView}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
          {currentView === "dashboard" && <DashboardPage />}
          {currentView === "inventory" && <InventoryPage />}
          {currentView === "categories" && <CategoriesPage />}
          {currentView === "suppliers" && <SuppliersPage />}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
