import { useState, useEffect, useRef } from "react";

// Intersection Observer Hook para animaciones al hacer scroll
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

const LandingPage = ({ onEnterApp }) => {
  const [heroRef, heroIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [featuresRef, featuresIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [techRef, techIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-t-0 border-x-0 !border-b-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text tracking-tight">Control Stock</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
            <a href="#caracteristicas" className="hover:text-white transition-colors">Características</a>
            <a href="#tecnologia" className="hover:text-white transition-colors">Tecnología</a>
            <a href="#precios" className="hover:text-white transition-colors">Precios</a>
          </div>

          <button 
            onClick={onEnterApp}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold glass glass-hover hover:text-white transition-all border border-white/10"
          >
            Iniciar Sesión
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div 
            ref={heroRef} 
            className={`space-y-8 ${heroIntersecting ? 'animate-slideUpAndFade' : 'opacity-0'}`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 text-xs font-medium text-indigo-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Nuevo: Sincronización en tiempo real
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Toma el control <br/>
              <span className="gradient-text">absoluto</span> de tu <br/>
              inventario
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-400 max-w-lg leading-relaxed">
              El sistema ágil e intuitivo en la nube para empresas modernas. Optimiza tus existencias, prevén quiebres de stock y toma decisiones basadas en datos al instante.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onEnterApp}
                className="px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5"
              >
                Comenzar Gratis
              </button>
              <button className="px-8 py-4 rounded-xl text-base font-semibold text-white glass glass-hover transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ver Demo
              </button>
            </div>
          </div>

          {/* UI Mockup */}
          <div className={`relative ${heroIntersecting ? 'animate-slideUpAndFade' : 'opacity-0'} delay-150`}>
            <div className="relative rounded-2xl glass border border-white/10 p-2 shadow-2xl bg-gray-900/50">
              {/* Window controls */}
              <div className="flex gap-2 px-3 py-2 border-b border-white/5 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              
              {/* Mockup Content */}
              <div className="p-4 space-y-4">
                {/* Top Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4 border border-white/5">
                    <p className="text-gray-400 text-xs mb-1">Valor de Inventario</p>
                    <p className="text-2xl font-bold text-white">$124,500</p>
                    <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                      12.5% este mes
                    </div>
                  </div>
                  <div className="glass rounded-xl p-4 border border-white/5">
                    <p className="text-gray-400 text-xs mb-1">Alertas de Stock</p>
                    <p className="text-2xl font-bold text-white">3 Críticas</p>
                    <div className="mt-2 text-xs text-rose-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                      Requiere atención
                    </div>
                  </div>
                </div>

                {/* Mockup Chart Area */}
                <div className="glass rounded-xl p-4 border border-white/5 h-32 flex items-end justify-between gap-2 px-6">
                  {[40, 70, 45, 90, 65, 85, 120].map((h, i) => (
                    <div key={i} className="w-full bg-gradient-to-t from-indigo-500/20 to-purple-500/50 rounded-t-sm" style={{ height: `${(h/120)*100}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="caracteristicas" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Todo lo que necesitas para tu inventario</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Módulos especializados diseñados para darte visibilidad y control total sobre tus operaciones diarias.</p>
          </div>

          <div 
            ref={featuresRef}
            className={`grid md:grid-cols-3 gap-6 ${featuresIntersecting ? 'animate-slideUpAndFade' : 'opacity-0'}`}
          >
            {/* Feature 1 */}
            <div className="glass glass-hover rounded-2xl p-8 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white">Dashboard Analítico</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Visualización instantánea del valor total de existencias, alertas tempranas de niveles críticos y analíticas simplificadas para decisiones rápidas.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass glass-hover rounded-2xl p-8 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white">Gestión de Inventario Inteligente</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Tablas e interfaces ágiles para administrar productos con SKU, precios, y niveles exactos de stock sin complicaciones.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass glass-hover rounded-2xl p-8 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white">Organización por Categorías</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Clasificación estructural eficiente para segmentar tu mercancía, agilizar búsquedas y mantener tu catálogo impecable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tecnologia" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-indigo-950/10 to-gray-950"></div>
        <div 
          ref={techRef}
          className={`max-w-4xl mx-auto px-6 relative z-10 text-center ${techIntersecting ? 'animate-slideUpAndFade' : 'opacity-0'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8">
            <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span className="text-sm font-medium">Tecnología de Punta</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Infraestructura robusta en la nube</h2>
          <p className="text-gray-400 text-lg mb-12">
            Respaldado por la potencia de <strong>Firebase</strong> y <strong>Firestore</strong>, garantizamos sincronización instantánea, alta disponibilidad del 99.9% y protección de datos de grado empresarial para tu negocio.
          </p>
          
          <div className="flex justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Firebase Logo SVG mockup */}
            <div className="flex flex-col items-center gap-2">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.156 11.233L2.33 5.485c-.208-.65.55-1.183 1.1-.736l3.78 3.09L9.62 1.34c.18-.545.955-.545 1.135 0l2.365 7.158 5.666-5.465c.47-.453 1.25-.138 1.28.513l.872 17.653-8.082 4.542c-.524.294-1.162.294-1.686 0L4.156 11.233z" fill="#FFA000"/>
                <path d="M12.001 24.81l8.08-4.54-7.55-7.4-4.88 4.67 4.35 7.27z" fill="#F57C00"/>
                <path d="M20.938 20.27L20.066 2.618c-.03-.65-.81-.966-1.28-.513l-10.74 10.36 12.89 7.805z" fill="#FFCA28"/>
              </svg>
              <span className="text-xs font-semibold">Firebase</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
              <span className="text-xs font-semibold">Firestore</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer & CTA */}
      <footer className="relative border-t border-white/5 pt-20 pb-10 overflow-hidden">
        {/* Glow CTA */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-purple-500/10 blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para optimizar tu negocio?</h2>
          <p className="text-xl text-gray-400 mb-8">Únete a miles de empresas que ya gestionan su inventario de manera inteligente.</p>
          <button 
            onClick={onEnterApp}
            className="px-8 py-4 rounded-xl text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-1"
          >
            Regístrate hoy — Es Gratis
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-gray-500">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-300">Control Stock</span>
            <span className="ml-2">© 2026. Todos los derechos reservados.</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Términos</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
