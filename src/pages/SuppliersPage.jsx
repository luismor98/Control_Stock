import { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useSuppliers } from "../hooks/useSuppliers";

// ── Íconos (Heroicons outline) ──────────────────────────────────────
const IconBuilding = ({ className = "w-5 h-5" }) => (
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
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
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

const IconPhone = () => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const IconMail = () => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

// ── Modal de Crear / Editar ─────────────────────────────────────────
const SupplierModal = ({ supplier, onClose, onSubmit }) => {
  const isEditing = Boolean(supplier);

  const parsePhone = (phoneStr) => {
    if (!phoneStr) return { prefix: "0414", number: "", customPrefix: "" };
    const cleaned = phoneStr.replace(/\D/g, "");
    if (cleaned.length >= 11) {
      const pfx = cleaned.slice(0, 4);
      const num = cleaned.slice(4, 11);
      const standardPrefixes = ["0416", "0426", "0414", "0424", "0412", "0422"];
      if (standardPrefixes.includes(pfx)) {
        return { prefix: pfx, number: num, customPrefix: "" };
      } else {
        return { prefix: "otro", customPrefix: pfx, number: num };
      }
    }
    return { prefix: "0414", number: cleaned.slice(0, 7), customPrefix: "" };
  };

  const initialPhone = parsePhone(supplier?.telefono);

  const parseRif = (rifStr) => {
    if (!rifStr) return { prefix: "J", number: "" };
    const cleaned = rifStr.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleaned.length > 0) {
      const pfx = cleaned.charAt(0);
      const num = cleaned.slice(1).replace(/\D/g, "").slice(0, 9);
      const validPrefixes = ["V", "E", "P", "J", "G", "C", "N"];
      if (validPrefixes.includes(pfx)) {
        return { prefix: pfx, number: num };
      }
    }
    return { prefix: "J", number: cleaned.replace(/\D/g, "").slice(0, 9) };
  };

  const initialRif = parseRif(supplier?.rif);

  const [phonePrefix, setPhonePrefix] = useState(initialPhone.prefix);
  const [customPrefix, setCustomPrefix] = useState(initialPhone.customPrefix);
  const [phoneNumber, setPhoneNumber] = useState(initialPhone.number);
  const [phoneError, setPhoneError] = useState("");

  const [rifPrefix, setRifPrefix] = useState(initialRif.prefix);
  const [rifNumber, setRifNumber] = useState(initialRif.number);
  const [rifError, setRifError] = useState("");

  const [form, setForm] = useState({
    razonSocial: supplier?.razonSocial ?? "",
    nombreComercial: supplier?.nombreComercial ?? "",
    direccionFiscal: supplier?.direccionFiscal ?? "",
    email: supplier?.email ?? "",
    personaContacto: supplier?.personaContacto ?? "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleCustomPrefixChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setCustomPrefix("");
      setPhoneError("");
      return;
    }
    if (!/^\d+$/.test(val)) {
      setPhoneError("El código solo permite números.");
      return;
    }
    setPhoneError("");
    if (val.length <= 4) setCustomPrefix(val);
  };

  const handlePhoneNumberChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setPhoneNumber("");
      setPhoneError("");
      return;
    }
    if (!/^\d+$/.test(val)) {
      setPhoneError("Solo se permiten números en el teléfono.");
      return;
    }
    setPhoneError("");
    if (val.length <= 7) setPhoneNumber(val);
  };

  const handleRifNumberChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setRifNumber("");
      setRifError("");
      return;
    }
    if (!/^\d+$/.test(val)) {
      setRifError("Solo se permiten números en el RIF.");
      return;
    }
    setRifError("");
    if (val.length <= 9) setRifNumber(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.razonSocial.trim() ||
      !rifNumber ||
      !form.nombreComercial.trim()
    ) {
      setError("La Razón Social, Nombre Comercial y RIF son obligatorios.");
      return;
    }

    if (rifNumber.length !== 9) {
      setError("El número de RIF debe tener exactamente 9 dígitos numéricos.");
      return;
    }

    const finalPrefix = phonePrefix === "otro" ? customPrefix : phonePrefix;
    let finalPhone = "";

    if (finalPrefix || phoneNumber) {
      if (finalPrefix.length !== 4) {
        setError("El código de teléfono debe tener 4 dígitos.");
        return;
      }
      if (phoneNumber.length !== 7) {
        setError("El número de teléfono debe tener 7 dígitos numéricos.");
        return;
      }
      finalPhone = `${finalPrefix}-${phoneNumber}`;
    }

    const finalRif = `${rifPrefix}-${rifNumber}`;

    onSubmit({
      ...form,
      razonSocial: form.razonSocial.trim(),
      nombreComercial: form.nombreComercial.trim(),
      rif: finalRif,
      direccionFiscal: form.direccionFiscal.trim(),
      email: form.email.trim(),
      personaContacto: form.personaContacto.trim(),
      telefono: finalPhone,
    });
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <IconBuilding className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              {isEditing ? "Editar Proveedor" : "Nuevo Proveedor"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-white/10 transition-all"
          >
            <IconX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Razón Social <span className="text-rose-500">*</span>
              </label>
              <input
                name="razonSocial"
                value={form.razonSocial}
                onChange={handleChange}
                placeholder="Ej: Inversiones ABC, C.A."
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nombre Comercial <span className="text-rose-500">*</span>
              </label>
              <input
                name="nombreComercial"
                value={form.nombreComercial}
                onChange={handleChange}
                placeholder="Ej: Comercializadora ABC"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Número de RIF <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={rifPrefix}
                  onChange={(e) => {
                    setRifPrefix(e.target.value);
                    setRifError("");
                  }}
                  className="w-[70px] px-2 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                >
                  <option value="V">V</option>
                  <option value="E">E</option>
                  <option value="P">P</option>
                  <option value="J">J</option>
                  <option value="G">G</option>
                  <option value="C">C</option>
                  <option value="N">N</option>
                </select>
                <input
                  type="text"
                  value={rifNumber}
                  onChange={handleRifNumberChange}
                  placeholder="123456789"
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                />
              </div>
              {rifError && (
                <p className="text-xs text-rose-500 mt-1">{rifError}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Persona de Contacto
              </label>
              <input
                name="personaContacto"
                value={form.personaContacto}
                onChange={handleChange}
                placeholder="Nombre y Apellido"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Teléfono
              </label>
              <div className="flex gap-2">
                <select
                  value={phonePrefix}
                  onChange={(e) => {
                    setPhonePrefix(e.target.value);
                    setPhoneError("");
                  }}
                  className="w-[50%] px-2 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                >
                  <option value="0416">0416</option>
                  <option value="0426">0426</option>
                  <option value="0414">0414</option>
                  <option value="0424">0424</option>
                  <option value="0412">0412</option>
                  <option value="0422">0422</option>
                  <option value="otro">Otro</option>
                </select>

                {phonePrefix === "otro" && (
                  <input
                    type="text"
                    value={customPrefix}
                    onChange={handleCustomPrefixChange}
                    placeholder="0000"
                    className="w-[50%] px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all text-center"
                  />
                )}

                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="1234567"
                  className="w-[150px] px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                />
              </div>
              {phoneError && (
                <p className="text-xs text-rose-500 mt-1">{phoneError}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Ej: contacto@empresa.com"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Dirección Fiscal
              </label>
              <textarea
                name="direccionFiscal"
                value={form.direccionFiscal}
                onChange={handleChange}
                placeholder="Dirección completa de la empresa..."
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all resize-none"
              />
            </div>
          </div>
          {error && <p className="text-xs text-rose-500 mt-2">{error}</p>}

          <div className="flex gap-2.5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 active:scale-95"
            >
              {isEditing ? "Guardar cambios" : "Registrar Proveedor"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

// ── Modal de confirmación de eliminación ────────────────────────────
const DeleteConfirmModal = ({ supplier, onClose, onConfirm }) => (
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
            Eliminar Proveedor
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Esta acción no se puede deshacer
          </p>
        </div>
      </div>
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-3">
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          ¿Estás seguro que deseas eliminar a{" "}
          <span className="font-semibold">"{supplier.razonSocial}"</span>?
        </p>
      </div>
      <div className="flex gap-2.5">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            onConfirm(supplier.id);
            onClose();
          }}
          className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/25 transition-all active:scale-95"
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  </div>
);

// ── Fila de la tabla ────────────────────────────────────────────────
const SupplierRow = ({ supplier, onEdit, onDelete, isAdmin }) => {
  return (
    <tr className="group border-b border-gray-100 dark:border-white/[0.04] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {supplier.razonSocial}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
              {supplier.nombreComercial} • RIF: {supplier.rif}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1.5 truncate">
            <IconPhone /> {supplier.telefono || "Sin teléfono"}
          </span>
          <span className="flex items-center gap-1.5 truncate">
            <IconMail /> {supplier.email || "Sin correo"}
          </span>
        </div>
      </td>
      <td className="px-5 py-4">
        <p className="text-sm text-gray-900 dark:text-gray-300 font-medium truncate">
          {supplier.personaContacto || (
            <span className="italic text-gray-400">Sin especificar</span>
          )}
        </p>
      </td>
      {isAdmin && (
        <td className="px-5 py-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => onEdit(supplier)}
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
              onClick={() => onDelete(supplier)}
              title="Eliminar"
              className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/25 hover:text-rose-700 dark:hover:text-rose-300 flex items-center justify-center transition-all duration-200 border border-rose-200 dark:border-rose-500/10 hover:border-rose-300 dark:hover:border-rose-500/30"
            >
              <IconTrash />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

// ── Página Principal ────────────────────────────────────────────────
const SuppliersPage = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } =
    useSuppliers();
  const [modal, setModal] = useState(null); // null | { type: "create" | "edit" | "delete", data?: supplier }

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.rol === "admin";

  const openCreate = () => setModal({ type: "create" });
  const openEdit = (supp) => setModal({ type: "edit", data: supp });
  const openDelete = (supp) => setModal({ type: "delete", data: supp });
  const closeModal = () => setModal(null);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Gestión de Proveedores
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Administra los datos fiscales y de contacto de tus proveedores
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={openCreate}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500
              text-white text-xs sm:text-sm font-medium transition-all duration-200
              shadow-lg shadow-indigo-500/20 flex-shrink-0 active:scale-95"
          >
            <IconPlus />
            <span className="hidden sm:inline">Nuevo Proveedor</span>
            <span className="sm:hidden">Nuevo</span>
          </button>
        )}
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 p-4 shadow-sm dark:shadow-none">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total Proveedores
          </p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
            {suppliers.length}
          </p>
        </div>
        <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 p-4 shadow-sm dark:shadow-none">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Registrados Recientemente
          </p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {Math.min(suppliers.length, 3)}
          </p>
        </div>
      </div>

      {/* ── Tabla ── */}
      <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none overflow-hidden">
        {suppliers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
            <IconBuilding className="w-10 h-10 opacity-30" />
            <p className="text-sm font-medium">
              No hay proveedores registrados
            </p>
            {isAdmin && (
              <button
                onClick={openCreate}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Registrar el primer proveedor
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02]">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Datos de la Empresa
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Representante
                  </th>
                  {isAdmin && (
                    <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supp) => (
                  <SupplierRow
                    key={supp.id}
                    supplier={supp}
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
        <SupplierModal
          supplier={null}
          onClose={closeModal}
          onSubmit={addSupplier}
        />
      )}
      {modal?.type === "edit" && (
        <SupplierModal
          supplier={modal.data}
          onClose={closeModal}
          onSubmit={(data) => updateSupplier({ ...data, id: modal.data.id })}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteConfirmModal
          supplier={modal.data}
          onClose={closeModal}
          onConfirm={deleteSupplier}
        />
      )}
    </div>
  );
};

export default SuppliersPage;
