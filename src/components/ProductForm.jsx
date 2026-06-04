import { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, editingProduct, onCancelEdit, categories = [] }) => {
  const defaultCategory = categories.length > 0 ? categories[0].name : "";
  const emptyForm = {
    name: "",
    category: defaultCategory,
    quantity: "",
    price: "",
    description: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        category: editingProduct.category,
        quantity: String(editingProduct.quantity),
        price: String(editingProduct.price),
        description: editingProduct.description || "",
      });
      setErrors({});
    } else {
      setForm(emptyForm);
      setErrors({});
    }
  }, [editingProduct]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es requerido";
    if (
      !form.quantity ||
      isNaN(Number(form.quantity)) ||
      Number(form.quantity) < 0
    )
      newErrors.quantity = "Cantidad válida requerida (≥ 0)";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      newErrors.price = "Precio válido requerido (> 0)";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      name: form.name.trim(),
      category: form.category,
      quantity: Number(form.quantity),
      price: parseFloat(Number(form.price).toFixed(2)),
      description: form.description.trim(),
    });
    setForm(emptyForm);
    setErrors({});
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setErrors({});
    onCancelEdit();
  };

  const isEditing = Boolean(editingProduct);

  const inputClass = (field) =>
    `w-full bg-gray-50 dark:bg-gray-900/60 border rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 transition-all duration-200
    ${
      errors[field]
        ? "border-rose-400 dark:border-rose-500/60 focus:ring-rose-500/30 focus:border-rose-500"
        : "border-gray-200 dark:border-gray-700/50 focus:ring-indigo-500/30 focus:border-indigo-400 dark:focus:border-indigo-500/60"
    }`;

  return (
    <div
      className={`bg-white dark:bg-transparent dark:glass rounded-2xl p-6 border transition-all duration-300 shadow-sm dark:shadow-none ${isEditing ? "border-amber-300 dark:border-amber-500/30 shadow-amber-100 dark:shadow-lg dark:shadow-amber-500/10" : "border-gray-200 dark:border-white/5"}`}
    >
      
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${isEditing ? "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400" : "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"}`}
        >
          {isEditing ? (
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
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          ) : (
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
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          )}
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            {isEditing ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {isEditing
              ? `Editando: ${editingProduct.name}`
              : "Completa los campos para agregar"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
            Nombre del producto *
          </label>
          <input
            id="product-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ej: Laptop Dell XPS 15"
            className={inputClass("name")}
          />
          {errors.name && (
            <p className="text-xs text-rose-500 dark:text-rose-400 mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
            Categoría
          </label>
          <select
            id="product-category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass("category")}
          >
            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.name}
                className="bg-white dark:bg-gray-900"
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              Cantidad *
            </label>
            <input
              id="product-quantity"
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={inputClass("quantity")}
            />
            {errors.quantity && (
              <p className="text-xs text-rose-500 dark:text-rose-400 mt-1">
                {errors.quantity}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              Precio (USD) *
            </label>
            <input
              id="product-price"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              className={inputClass("price")}
            />
            {errors.price && (
              <p className="text-xs text-rose-500 dark:text-rose-400 mt-1">
                {errors.price}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
            Descripción (opcional)
          </label>
          <textarea
            id="product-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe brevemente el producto..."
            rows={2}
            className={`${inputClass("description")} resize-none`}
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            id="form-submit-btn"
            type="submit"
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-95 shadow-lg
              ${
                isEditing
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/25"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/25"
              }`}
          >
            {isEditing ? "Guardar Cambios" : "+ Agregar Producto"}
          </button>
          {isEditing && (
            <button
              id="form-cancel-btn"
              type="button"
              onClick={handleCancel}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 hover:text-gray-800 dark:hover:text-white transition-all duration-200 border border-gray-200 dark:border-gray-700/40"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
