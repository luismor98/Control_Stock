import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";

// ─── Datos Mock Iniciales ───────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Laptop Dell XPS 15",
    category: "Electrónica",
    quantity: 12,
    price: 1299.99,
    description: "Intel Core i7, 16GB RAM, 512GB SSD",
  },
  {
    id: 2,
    name: "Mouse Logitech MX Master 3",
    category: "Electrónica",
    quantity: 3,
    price: 99.99,
    description: "Inalámbrico, ergonómico",
  },
  {
    id: 3,
    name: 'Monitor Samsung 27"',
    category: "Electrónica",
    quantity: 8,
    price: 349.0,
    description: "4K UHD, 60Hz, IPS",
  },
  {
    id: 4,
    name: "Silla Ergonómica Herman Miller",
    category: "Hogar",
    quantity: 2,
    price: 1450.0,
    description: "Aeron, ajuste lumbar",
  },
  {
    id: 5,
    name: "Teclado Mecánico Keychron K8",
    category: "Electrónica",
    quantity: 0,
    price: 89.0,
    description: "TKL, switches Brown, retroiluminado",
  },
  {
    id: 6,
    name: "Cuaderno Ejecutivo A5",
    category: "Oficina",
    quantity: 50,
    price: 8.5,
    description: "Tapa dura, 200 páginas",
  },
  {
    id: 7,
    name: "Auriculares Sony WH-1000XM5",
    category: "Electrónica",
    quantity: 5,
    price: 349.99,
    description: "Noise cancelling, Bluetooth 5.2",
  },
  {
    id: 8,
    name: "Webcam Logitech C922",
    category: "Electrónica",
    quantity: 4,
    price: 79.99,
    description: "1080p 30fps, micrófono dual",
  },
  {
    id: 9,
    name: "Bolígrafo Pilot G2",
    category: "Oficina",
    quantity: 120,
    price: 1.99,
    description: "Pack x12 unidades, tinta gel",
  },
  {
    id: 10,
    name: "Disco Duro Externo 2TB",
    category: "Electrónica",
    quantity: 1,
    price: 89.0,
    description: "USB 3.0, compatible Mac/PC",
  },
  {
    id: 11,
    name: "Camiseta Polo Básica",
    category: "Ropa",
    quantity: 30,
    price: 24.99,
    description: "Algodón 100%, varios colores",
  },
  {
    id: 12,
    name: "Café Grano Especial 1kg",
    category: "Alimentos",
    quantity: 15,
    price: 18.5,
    description: "Origen Etiopía, tueste medio",
  },
  {
    id: 13,
    name: "Destornillador Set 18pcs",
    category: "Herramientas",
    quantity: 7,
    price: 34.99,
    description: "Cromo-vanadio, magnéticos",
  },
  {
    id: 14,
    name: "Organizador de Escritorio",
    category: "Oficina",
    quantity: 22,
    price: 19.99,
    description: "Bambú, 5 compartimentos",
  },
];

const STOCK_THRESHOLD = 5;

// ─── Función para calcular estadísticas derivadas ────────────────────────────
const computeStats = (products) => ({
  totalProducts: products.length,
  totalUnits: products.reduce((sum, p) => sum + p.quantity, 0),
  totalValue: products.reduce((sum, p) => sum + p.price * p.quantity, 0),
  lowStockCount: products.filter(
    (p) => p.quantity <= STOCK_THRESHOLD && p.quantity > 0,
  ).length,
  outOfStockCount: products.filter((p) => p.quantity === 0).length,
});

// ─── App — Componente raíz con estado elevado ────────────────────────────────
const App = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(true); // dark mode activado por defecto
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(computeStats([]));
  const [isLoading, setIsLoading] = useState(true);
  const [nextId, setNextId] = useState(INITIAL_PRODUCTS.length + 1);

  // useEffect #1: Aplica/quita la clase "dark" en <html> según el estado
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // useEffect #2: Simula carga inicial de datos (como si fuera un fetch)
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(INITIAL_PRODUCTS);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // useEffect #3: Recalcula estadísticas cada vez que cambia el inventario
  useEffect(() => {
    setStats(computeStats(products));
  }, [products]);

  // ── Operaciones CRUD ─────────────────────────────────────────────────────
  const handleAddProduct = (formData) => {
    const newProduct = { id: nextId, ...formData };
    setProducts((prev) => [...prev, newProduct]);
    setNextId((id) => id + 1);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ── Pantalla de carga ────────────────────────────────────────────────────
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
    />
  );
};

export default App;
