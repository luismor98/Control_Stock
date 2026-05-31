import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

// Vista de Inventario — CRUD completo
const InventoryPage = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSubmit = (formData) => {
    if (editingProduct) {
      onUpdateProduct({ ...formData, id: editingProduct.id });
      setEditingProduct(null);
    } else {
      onAddProduct(formData);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    // Scroll al formulario en móvil
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => setEditingProduct(null);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      {/* Encabezado */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          Gestión de Inventario
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Agrega, edita y elimina productos del inventario
        </p>
      </div>

      {/* Layout: 1 columna en móvil, formulario+tabla en dos columnas en xl */}
      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-4 sm:gap-5 items-start">
        {/* Columna formulario — sticky solo en desktop */}
        <div className="xl:sticky xl:top-6">
          <ProductForm
            onSubmit={handleSubmit}
            editingProduct={editingProduct}
            onCancelEdit={handleCancelEdit}
          />

          {/* Mini stats del inventario actual */}
          <div className="mt-4 bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 p-4 space-y-3 shadow-sm dark:shadow-none">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Resumen Rápido
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Total productos
              </span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-300">
                {products.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Total unidades
              </span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-300">
                {products
                  .reduce((sum, p) => sum + p.quantity, 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Valor total
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-300">
                $
                {products
                  .reduce((sum, p) => sum + p.price * p.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={onDeleteProduct}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
