import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = ({ onNavigateToRegister, onNavigateToLanding }) => {
  const { login, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 font-sans selection:bg-indigo-500/30">
      {/* Botón de volver al inicio */}
      <button
        onClick={onNavigateToLanding}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-50 group"
      >
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <span className="text-sm font-semibold hidden sm:block">
          Volver al inicio
        </span>
      </button>

      {/* Background glow para darle el mismo estilo de la marca */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-slideUpAndFade">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 shadow-lg shadow-indigo-500/20 mb-4">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Bienvenido a <span className="gradient-text">Control Stock</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Ingresa tus credenciales para acceder a tu panel.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 border border-white/10 shadow-2xl space-y-6"
        >
          {/* El error ahora viene del hook, no de useSelector directo */}
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Correo Electrónico
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@correo.com"
              className="w-full bg-gray-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="flex text-sm font-medium text-gray-300 mb-2 justify-between items-center">
              <span>Contraseña</span>
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${
              isLoading
                ? "bg-gray-800 text-gray-400 cursor-not-allowed border border-white/5"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          ¿No tienes cuenta?{" "}
          <button
            onClick={onNavigateToRegister}
            className="gradient-text font-bold hover:opacity-80 transition-opacity"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
