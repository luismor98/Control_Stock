import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { useUI } from "../hooks/useUI";
import { useAuth } from "../hooks/useAuth";

const InventoryPage = () => {
  const { products, stats, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const { categories } = useCategories();
  const { triggerToast } = useUI();
  const [editingProduct, setEditingProduct] = useState(null);

  const { user } = useAuth();
  const isAdmin = user?.rol === "admin";

  const handleSubmit = (formData) => {
    if (editingProduct) {
      updateProduct({ ...formData, id: editingProduct.id });
      setEditingProduct(null);
    } else {
      addProduct(formData);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => setEditingProduct(null);

  const handleExportCSV = () => {
    if (!products || products.length === 0) {
      triggerToast("No hay productos para exportar", "error");
      return;
    }

    const headers = ["ID;Nombre;Categoria;Precio;Cantidad;Descripcion"];
    const rows = products.map((p) => {
      const name = p.name ? p.name.replace(/;/g, "").replace(/\n/g, " ") : "";
      const cat = p.category
        ? p.category.replace(/;/g, "").replace(/\n/g, " ")
        : "";
      const desc = p.description
        ? p.description.replace(/;/g, "").replace(/\n/g, " ")
        : "";

      return `${p.id};${name};${cat};${p.price};${p.quantity};${desc}`;
    });

    // "sep=;\n" obliga a Excel a reconocer el punto y coma como separador de columnas
    const csvContent = "sep=;\n" + headers.concat(rows).join("\n");

    // Inyectamos los bytes literales del BOM (Byte Order Mark) de UTF-8
    // Esto garantiza 100% que Excel lo lea con tildes y ñ correctamente
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inventario.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    if (!products || products.length === 0) {
      triggerToast("No hay productos para exportar", "error");
      return;
    }

    const headers = [
      "ID",
      "Nombre",
      "Categoría",
      "Precio",
      "Unidades",
      "Descripción",
    ];
    const rows = products.map((p) => [
      p.id?.substring(0, 8) + "...", // Mostrar un ID resumido para que quepa bien
      p.name || "-",
      p.category || "-",
      `$${Number(p.price || 0).toFixed(2)}`,
      p.quantity || 0,
      p.description || "-",
    ]);

    import("../utils/pdfExport").then(({ generatePDFReport }) => {
      generatePDFReport({
        title: "Reporte de Inventario Actual",
        filename: "Inventario",
        headers,
        rows,
      });
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Gestión de Inventario
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Agrega, edita y elimina productos del inventario
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40 w-full sm:w-auto"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Exportar CSV
          </button>

          <button
            onClick={handleExportPDF}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/40 w-full sm:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-4 sm:gap-5 items-start">
        <div className="xl:sticky xl:top-6">
          {isAdmin && (
            <ProductForm
              onSubmit={handleSubmit}
              editingProduct={editingProduct}
              onCancelEdit={handleCancelEdit}
              categories={categories}
            />
          )}

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
                {stats.totalUnits.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Valor total
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-300">
                ${stats.totalValue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={deleteProduct}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
