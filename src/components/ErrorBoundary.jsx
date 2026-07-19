import { useRouteError, useNavigate } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error("Error capturado por React Router:", error);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Ups! Algo salió mal</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Ocurrió un error inesperado al mostrar esta pantalla. No te preocupes, tus datos están a salvo.
          </p>
        </div>
        
        <button
          onClick={() => {
            navigate("/app/dashboard");
            window.location.reload();
          }}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/30"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
