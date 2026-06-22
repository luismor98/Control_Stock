import { useState } from "react";
import { createPortal } from "react-dom";

const STOCK_THRESHOLD = 5;

const CategoryBadge = ({ category }) => {
  const colors = {
    Electrónica:
      "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/20",
    Ropa: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-500/15 dark:text-pink-300 dark:border-pink-500/20",
    Alimentos:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/20",
    Herramientas:
      "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/20",
    Oficina:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/20",
    Hogar:
      "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/20",
    Otro: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-500/15 dark:text-gray-300 dark:border-gray-500/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${colors[category] || colors["Otro"]}`}
    >
      {category}
    </span>
  );
};

const ProductCard = ({ product, onEdit, onDelete, isAdmin }) => {
  const isLowStock =
    product.quantity <= STOCK_THRESHOLD && product.quantity > 0;
  const isOutOfStock = product.quantity === 0;

  return (
    <div className="bg-white dark:bg-transparent dark:glass rounded-xl border border-gray-200 dark:border-white/5 p-4 space-y-3 shadow-sm dark:shadow-none">
      
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">
            {product.name}
          </p>
          {product.description && (
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5 line-clamp-1">
              {product.description}
            </p>
          )}
        </div>
        <CategoryBadge category={product.category} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg py-2 px-1">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
            Cant.
          </p>
          <p
            className={`text-sm font-bold ${isOutOfStock ? "text-rose-500 dark:text-rose-400" : isLowStock ? "text-amber-500 dark:text-amber-400" : "text-gray-700 dark:text-gray-200"}`}
          >
            {product.quantity}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg py-2 px-1">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
            Precio
          </p>
          <p className="text-sm font-bold text-gray-700 dark:text-gray-200 font-mono">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg py-2 px-1">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
            Valor
          </p>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            ${(product.price * product.quantity).toFixed(0)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {isOutOfStock && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 font-medium">
              Sin stock
            </span>
          )}
          {isLowStock && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 font-medium">
              Stock bajo
            </span>
          )}
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <button
              id={`edit-btn-${product.id}`}
              onClick={() => onEdit(product)}
              className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/25 flex items-center justify-center transition-all border border-indigo-200 dark:border-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-500/30"
              title="Editar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              id={`delete-btn-${product.id}`}
              onClick={() => onDelete(product.id)}
              className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/25 flex items-center justify-center transition-all border border-rose-200 dark:border-rose-500/10 hover:border-rose-300 dark:hover:border-rose-500/30"
              title="Eliminar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductTable = ({ products, onEdit, onDelete, isAdmin }) => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field)
      return <span className="text-gray-400 dark:text-gray-600 ml-1">↕</span>;
    return (
      <span className="text-indigo-500 dark:text-indigo-400 ml-1">
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const filtered = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const handleDeleteClick = (id) => setConfirmDelete(id);

  const handleDeleteConfirm = () => {
    onDelete(confirmDelete);
    setConfirmDelete(null);
  };

  const thClass =
    "px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors select-none whitespace-nowrap";

  return (
    <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-none">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-gray-100 dark:border-white/5">
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
            Lista de Productos
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {filtered.length} de {products.length} productos
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="product-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto o categoría..."
            className="w-full bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/50 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 dark:focus:border-indigo-500/60 transition-all"
          />
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800/60 flex items-center justify-center text-gray-400 dark:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            No se encontraron productos
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 underline"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      )}

      {filtered.length > 0 && (
        <>
          
          <div className="md:hidden p-4 space-y-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={handleDeleteClick}
                isAdmin={isAdmin}
              />
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-white/5">
                <tr>
                  <th className={thClass} onClick={() => handleSort("name")}>
                    Nombre {renderSortIcon("name")}
                  </th>
                  <th
                    className={thClass}
                    onClick={() => handleSort("category")}
                  >
                    Categoría {renderSortIcon("category")}
                  </th>
                  <th
                    className={thClass}
                    onClick={() => handleSort("quantity")}
                  >
                    Cantidad {renderSortIcon("quantity")}
                  </th>
                  <th className={thClass} onClick={() => handleSort("price")}>
                    Precio {renderSortIcon("price")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Valor Total
                  </th>
                  {isAdmin && (
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/[0.04]">
                {filtered.map((product) => {
                  const isLowStock =
                    product.quantity <= STOCK_THRESHOLD && product.quantity > 0;
                  const isOutOfStock = product.quantity === 0;
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-4 py-3.5">
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                            {product.name}
                          </p>
                          {product.description && (
                            <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5 truncate max-w-xs">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <CategoryBadge category={product.category} />
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold ${isOutOfStock ? "text-rose-500 dark:text-rose-400" : isLowStock ? "text-amber-500 dark:text-amber-400" : "text-gray-700 dark:text-gray-200"}`}
                          >
                            {product.quantity}
                          </span>
                          {isOutOfStock && (
                            <span className="text-xs px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 font-medium">
                              Sin stock
                            </span>
                          )}
                          {isLowStock && (
                            <span className="text-xs px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 font-medium">
                              Stock bajo
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                          ${product.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-sm text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                          ${(product.price * product.quantity).toFixed(2)}
                        </span>
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              id={`edit-btn-${product.id}`}
                              onClick={() => onEdit(product)}
                              className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/25 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center justify-center transition-all duration-200 border border-indigo-200 dark:border-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-500/30"
                              title="Editar"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button
                              id={`delete-btn-${product.id}`}
                              onClick={() => handleDeleteClick(product.id)}
                              className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/25 hover:text-rose-700 dark:hover:text-rose-300 flex items-center justify-center transition-all duration-200 border border-rose-200 dark:border-rose-500/10 hover:border-rose-300 dark:hover:border-rose-500/30"
                              title="Eliminar"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14H6L5 6" />
                                <path d="M10 11v6M14 11v6" />
                                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {confirmDelete !== null && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfirmDelete(null);
          }}
        >
          <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-rose-600 dark:text-rose-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Eliminar Producto
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-3">
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                ¿Estás seguro que deseas eliminar el producto{" "}
                <span className="font-semibold">"{products.find((p) => p.id === confirmDelete)?.name}"</span>?
              </p>
            </div>
            <div className="flex gap-2.5">
              <button
                id="cancel-delete-btn"
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
              >
                Cancelar
              </button>
              <button
                id="confirm-delete-btn"
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/25 transition-all active:scale-95"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProductTable;
