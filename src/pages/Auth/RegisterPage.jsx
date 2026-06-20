import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../store/slices/authSlice';

const RegisterPage = ({ onNavigateToLogin }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth || { isLoading: false, error: null });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');

  // Limpiar errores cuando el componente se desmonta
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Validar si las contraseñas coinciden en tiempo real
  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
    } else {
      setPasswordError('');
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = formData.name && formData.email && formData.password && formData.confirmPassword && !passwordError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    dispatch(registerUser(formData));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 font-sans selection:bg-indigo-500/30 py-12">
      
      {/* Background glow para darle el mismo estilo de la marca */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-slideUpAndFade">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 shadow-lg shadow-indigo-500/20 mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Crear Cuenta
          </h2>
          <p className="text-gray-400 text-sm">Únete a <span className="gradient-text font-semibold">Control Stock</span> y optimiza tu negocio.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/10 shadow-2xl space-y-5">
          
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Nombre Completo</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              className="w-full bg-gray-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Correo Electrónico</label>
            <input
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
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full bg-gray-900/50 border text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all placeholder:text-gray-600 ${
                passwordError 
                  ? 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/50' 
                  : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/50'
              }`}
            />
            {passwordError && (
              <p className="text-rose-400 text-xs mt-1.5 ml-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white shadow-lg transition-all mt-2 ${
              (isLoading || !isFormValid)
                ? 'bg-gray-800 text-gray-400 cursor-not-allowed border border-white/5' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creando cuenta...
              </span>
            ) : (
              'Registrarse'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          ¿Ya tienes cuenta?{' '}
          <button 
            onClick={onNavigateToLogin}
            className="gradient-text font-bold hover:opacity-80 transition-opacity"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
