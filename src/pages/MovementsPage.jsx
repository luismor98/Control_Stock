import { useEffect, useState } from "react";
import { useMovements } from "../hooks/useMovements";
import LoadingScreen from "../components/LoadingScreen";

const MovementsPage = () => {
  const { movements, loading, error, reloadMovements } = useMovements();

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    product: "",
    user: "",
  });

  // Obtener la fecha y hora actual en la zona local del usuario en formato YYYY-MM-DDTHH:mm
  const now = new Date();
  const maxDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  useEffect(() => {
    reloadMovements();
  }, [reloadMovements]); // Refrescar al montar

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== ""),
    );

    // Ajustar fechas a la zona horaria local del cliente antes de enviar al backend
    if (cleanFilters.startDate) {
      // Si solo trae YYYY-MM-DD, completamos con la hora inicial del día
      const startStr =
        cleanFilters.startDate.length === 10
          ? cleanFilters.startDate + "T00:00:00"
          : cleanFilters.startDate;
      cleanFilters.startDate = new Date(startStr).toISOString();
    }
    if (cleanFilters.endDate) {
      const endStr =
        cleanFilters.endDate.length === 10
          ? cleanFilters.endDate + "T23:59:59.999"
          : cleanFilters.endDate;
      cleanFilters.endDate = new Date(endStr).toISOString();
    }

    reloadMovements(cleanFilters);
  };

  const clearFilters = () => {
    setFilters({ startDate: "", endDate: "", type: "", product: "", user: "" });
    reloadMovements({});
  };

  if (loading && movements.length === 0) {
    return <LoadingScreen text="Cargando historial..." />;
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-rose-500">Error: {error}</p>
      </div>
    );
  }

  const handleExportPDF = () => {
    if (!movements || movements.length === 0) {
      return;
    }

    const headers = ["Fecha", "Producto", "Tipo", "Cantidad", "Usuario"];
    const rows = movements.map((m) => {
      const dateStr = new Date(m.date).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return [
        dateStr,
        m.productName || "-",
        m.type || "-",
        m.quantity || 0,
        m.user?.name || m.user?.email || "-",
      ];
    });

    import("../utils/pdfExport").then(({ generatePDFReport }) => {
      generatePDFReport({
        title: "Kardex de Movimientos",
        filename: "Kardex",
        headers,
        rows,
      });
    });
  };

  return (
    <div className="h-full flex flex-col p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            Kardex de Movimientos
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Historial detallado de entradas y salidas de inventario
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-xs sm:text-sm font-medium transition-all duration-200 flex-shrink-0 active:scale-95 w-full sm:w-auto"
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
            <span className="hidden sm:inline">Exportar PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>

          <button
            onClick={applyFilters}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-lg shadow-indigo-500/20 flex-shrink-0 active:scale-95 w-full sm:w-auto"
          >
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
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            <span className="hidden sm:inline">Actualizar historial</span>
            <span className="sm:hidden">Actualizar</span>
          </button>
        </div>
      </div>

      {/* Panel de Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-white/5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Desde
            </label>
            <input
              type="datetime-local"
              name="startDate"
              value={filters.startDate}
              max={maxDateTime}
              onChange={handleFilterChange}
              className="w-full text-sm border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Hasta
            </label>
            <input
              type="datetime-local"
              name="endDate"
              value={filters.endDate}
              max={maxDateTime}
              onChange={handleFilterChange}
              className="w-full text-sm border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Tipo
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full text-sm border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Todos</option>
              <option value="ENTRADA">Entrada</option>
              <option value="SALIDA">Salida</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Producto
            </label>
            <input
              type="text"
              name="product"
              placeholder="Buscar producto..."
              value={filters.product}
              onChange={handleFilterChange}
              className="w-full text-sm border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Usuario
            </label>
            <input
              type="text"
              name="user"
              placeholder="Buscar usuario..."
              value={filters.user}
              onChange={handleFilterChange}
              className="w-full text-sm border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Limpiar Filtros
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-none flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-white/10">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[180px]">
                  Fecha
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[120px]">
                  Tipo
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right w-[120px]">
                  Cantidad
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right w-[120px]">
                  Saldo
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Usuario & Motivo
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {movements.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    No hay movimientos registrados.
                  </td>
                </tr>
              ) : (
                movements.map((mov) => {
                  const isEntrada = mov.type === "ENTRADA";
                  const date = new Date(mov.date);

                  return (
                    <tr
                      key={mov.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {date.toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {date.toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {mov.productName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                            isEntrada
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                              : "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                          }`}
                        >
                          {mov.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div
                          className={`text-sm font-bold ${isEntrada ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                        >
                          {isEntrada ? "+" : "-"}
                          {mov.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {mov.newStock}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 line-through">
                          {mov.previousStock}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[200px]"
                          title={mov.user.email}
                        >
                          {mov.user.name || mov.user.email}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                          {mov.reason || "-"}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovementsPage;
