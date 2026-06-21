import { useState } from "react";

// ── Ícono Tag (Heroicons outline) ──────────────────────────────────
const IconTag = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const IconTrash = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
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
);

const IconX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconPlus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconLock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ── Modal de Crear / Editar ─────────────────────────────────────────
const CategoryModal = ({ category, onClose, onSubmit }) => {
  const isEditing = Boolean(category);
  const [form, setForm] = useState({
    name: category?.name ?? "",
    description: category?.description ?? "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }
    onSubmit({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
    });
    onClose();
  };

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <IconTag className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              {isEditing ? "Editar categoría" : "Nueva categoría"}
            </h3>
          </div>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-white/10 transition-all"
          >
            <IconX />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="cat-name"
              className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Nombre <span className="text-rose-500">*</span>
            </label>
            <input
              id="cat-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Electrónica"
              autoFocus
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border
                text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all
                ${error ? "border-rose-400 dark:border-rose-500" : "border-gray-200 dark:border-white/10 focus:border-indigo-400"}`}
            />
            {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="cat-description"
              className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Descripción
            </label>
            <textarea
              id="cat-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción opcional de la categoría..."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10
                text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400
                transition-all resize-none"
            />
          </div>

          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              id="modal-cancel-btn"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border border-gray-200 dark:border-white/10
                text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5
                transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="modal-submit-btn"
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium
                bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 active:scale-95"
            >
              {isEditing ? "Guardar cambios" : "Crear categoría"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Modal de confirmación de eliminación ────────────────────────────
const DeleteConfirmModal = ({ category, onClose, onConfirm }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center flex-shrink-0">
          <IconTrash />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Eliminar categoría
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Esta acción no se puede deshacer
          </p>
        </div>
      </div>
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-3">
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          ⚠ Los productos de{" "}
          <span className="font-semibold">"{category.name}"</span> serán movidos
          automáticamente a{" "}
          <span className="font-semibold">"Sin categoría"</span>.
        </p>
      </div>
      <div className="flex gap-2.5">
        <button
          id="delete-cancel-btn"
          onClick={onClose}
          className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border border-gray-200 dark:border-white/10
            text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
        >
          Cancelar
        </button>
        <button
          id="delete-confirm-btn"
          onClick={() => {
            onConfirm(category.id);
            onClose();
          }}
          className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium
            bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/25 transition-all active:scale-95"
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  </div>
);

// ── Fila de la tabla ────────────────────────────────────────────────
const CategoryRow = ({ category, index, onEdit, onDelete, isAdmin }) => {
  const ACCENT_COLORS = [
    "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300",
    "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300",
    "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300",
    "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300",
    "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300",
    "bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300",
  ];
  const colorClass = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <tr className="group border-b border-gray-100 dark:border-white/[0.04] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}
          >
            <IconTag className="w-3.5 h-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate flex items-center gap-1.5">
              {category.name}
              {category.protected && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-500 text-[10px] font-medium">
                  <IconLock /> Protegida
                </span>
              )}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600 truncate mt-0.5">
              {category.description || (
                <span className="italic opacity-60">Sin descripción</span>
              )}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${colorClass}`}
        >
          ID #{category.id}
        </span>
      </td>
      {isAdmin && (
        <td className="px-5 py-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <button
              id={`edit-cat-${category.id}-btn`}
              onClick={() => onEdit(category)}
              title="Editar"
              className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/25 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center justify-center transition-all duration-200 border border-indigo-200 dark:border-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-500/30"
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
              id={`delete-cat-${category.id}-btn`}
              onClick={() => !category.protected && onDelete(category)}
              title={
                category.protected
                  ? "Esta categoría no puede eliminarse"
                  : "Eliminar"
              }
              disabled={category.protected}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 border
                ${
                  category.protected
                    ? "bg-gray-50 dark:bg-gray-800/30 text-gray-300 dark:text-gray-700 border-gray-100 dark:border-gray-700/30 cursor-not-allowed"
                    : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/25 hover:text-rose-700 dark:hover:text-rose-300 border-rose-200 dark:border-rose-500/10 hover:border-rose-300 dark:hover:border-rose-500/30 cursor-pointer"
                }`}
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
};

// ── Página Principal ────────────────────────────────────────────────
import { useCategories } from "../hooks/useCategories";
import { useSelector } from "react-redux";

const CategoriesPage = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [modal, setModal] = useState(null); // null | { type: "create" | "edit" | "delete", data?: category }

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.rol === 'admin';

  const openCreate = () => setModal({ type: "create" });
  const openEdit = (cat) => setModal({ type: "edit", data: cat });
  const openDelete = (cat) => setModal({ type: "delete", data: cat });
  const closeModal = () => setModal(null);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Gestión de Categorías
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Organiza y administra las categorías de tus productos
          </p>
        </div>
        {isAdmin && (
          <button
            id="add-category-btn"
            onClick={openCreate}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500
              text-white text-xs sm:text-sm font-medium transition-all duration-200
              shadow-lg shadow-indigo-500/20 flex-shrink-0 active:scale-95"
          >
            <IconPlus />
            <span className="hidden sm:inline">Nueva categoría</span>
            <span className="sm:hidden">Nueva</span>
          </button>
        )}
      </div>

      {/* ── Stats rápidas ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 p-4 shadow-sm dark:shadow-none">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total categorías
          </p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
            {categories.length}
          </p>
        </div>
        <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 p-4 shadow-sm dark:shadow-none">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Personalizadas
          </p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {categories.filter((c) => !c.protected).length}
          </p>
        </div>
        <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 p-4 shadow-sm dark:shadow-none col-span-2 sm:col-span-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Protegidas</p>
          <p className="text-2xl font-bold text-gray-500 dark:text-gray-400 mt-1">
            {categories.filter((c) => c.protected).length}
          </p>
        </div>
      </div>

      {/* ── Tabla ── */}
      <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none overflow-hidden">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
            <IconTag className="w-10 h-10 opacity-30" />
            <p className="text-sm font-medium">No hay categorías creadas</p>
            {isAdmin && (
              <button
                onClick={openCreate}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Crear la primera categoría
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/[0.06]">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Identificador
                  </th>
                  {isAdmin && (
                    <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, i) => (
                  <CategoryRow
                    key={cat.id}
                    category={cat}
                    index={i}
                    onEdit={openEdit}
                    onDelete={openDelete}
                    isAdmin={isAdmin}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modales ── */}
      {modal?.type === "create" && (
        <CategoryModal
          category={null}
          onClose={closeModal}
          onSubmit={addCategory}
        />
      )}
      {modal?.type === "edit" && (
        <CategoryModal
          category={modal.data}
          onClose={closeModal}
          onSubmit={(data) => updateCategory({ ...data, id: modal.data.id })}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteConfirmModal
          category={modal.data}
          onClose={closeModal}
          onConfirm={deleteCategory}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
