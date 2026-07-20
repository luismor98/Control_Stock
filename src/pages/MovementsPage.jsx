import { useEffect } from "react";
import { useMovements } from "../hooks/useMovements";
import LoadingScreen from "../components/LoadingScreen";

const MovementsPage = () => {
  const { movements, loading, error, reloadMovements } = useMovements();

  useEffect(() => {
    reloadMovements();
  }, [reloadMovements]); // Refrescar al montar

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

  return (
    <div className="h-full flex flex-col p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            Kardex de Movimientos
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Historial detallado de entradas y salidas de inventario
          </p>
        </div>
        <button
          onClick={reloadMovements}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-lg shadow-indigo-500/20 flex-shrink-0 active:scale-95"
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
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No hay movimientos registrados.
                  </td>
                </tr>
              ) : (
                movements.map((mov) => {
                  const isEntrada = mov.type === "ENTRADA";
                  const date = new Date(mov.date);
                  
                  return (
                    <tr key={mov.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
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
                        <div className={`text-sm font-bold ${isEntrada ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                          {isEntrada ? "+" : "-"}{mov.quantity}
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
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[200px]" title={mov.user.email}>
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
