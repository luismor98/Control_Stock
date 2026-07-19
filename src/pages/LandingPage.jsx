
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useUI } from "../hooks/useUI";
import ejemploImg from "../assets/img/Ejemplo.png";

const FadeIn = ({ children, delay = "", className = "" }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${delay} ${className}`}
    >
      {children}
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { triggerToast } = useUI();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans antialiased selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg
                className="w-6 h-6 text-white"
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
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Control Stock
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#inicio" className="hover:text-white transition-colors">
              Inicio
            </a>
            <a href="#solucion" className="hover:text-white transition-colors">
              Solución
            </a>
            <a
              href="#caracteristicas"
              className="hover:text-white transition-colors"
            >
              Características
            </a>
            <a href="#metricas" className="hover:text-white transition-colors">
              Resultados
            </a>
            <a
              href="#testimonios"
              className="hover:text-white transition-colors"
            >
              Clientes
            </a>
            <a
              href="#newsletter"
              className="hover:text-white transition-colors"
            >
              Suscribirse
            </a>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
          >
            Iniciar Sesión
          </button>
        </div>
      </nav>

      <main>
        {/* 1. Hero Section */}
        <section
          id="inicio"
          className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <FadeIn delay="delay-100">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8">
                Inventario sin estrés para empresas que crecen
                <br className="hidden md:block" />
              </h1>
            </FadeIn>

            <FadeIn delay="delay-200">
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Olvídate de las hojas de cálculo desactualizadas. Control Stock
                te da visibilidad total de tu inventario, alertas automáticas y
                reportes al instante.
              </p>
            </FadeIn>

            <FadeIn delay="delay-300">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/login')}
                  className="px-9 py-4 rounded-xl text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1"
                >
                  Probar Aquí
                </button>
              </div>
            </FadeIn>

            <FadeIn delay="delay-500" className="mt-20">
              <div className="relative rounded-2xl md:rounded-[2rem] bg-slate-900 border border-white/10 p-2 md:p-4 shadow-2xl max-w-5xl mx-auto">
                <div className="flex gap-2 px-4 py-3 border-b border-white/5 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <img
                  src={ejemploImg}
                  //src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                  alt="Dashboard Preview"
                  className="w-full rounded-xl opacity-90"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-8">
              500+ negocios confían en nosotros
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 text-white/70">
              <span className="text-2xl font-bold">TechStore</span>
              <span className="text-2xl font-serif italic">Boutique</span>
              <span className="text-2xl font-black">MegaMart</span>
              <span className="text-2xl font-mono">SUPPLY.CO</span>
              <span className="text-2xl font-bold tracking-widest">GLOBAL</span>
            </div>
          </div>
        </section>

        <section id="solucion" className="py-24 px-6 max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                El fin del caos en tu almacén
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Diseñado para ser intuitivo desde el primer día, potente para
                siempre.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay="delay-100">
              <div className="bg-red-950/20 border border-red-500/20 rounded-3xl p-8 lg:p-12 h-full">
                <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  La forma antigua
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span> Hojas de
                    cálculo pesadas y propensas a errores.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span> Quiebres de
                    stock por falta de alertas.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span> Datos
                    desincronizados entre el equipo.
                  </li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay="delay-200">
              <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-3xl p-8 lg:p-12 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full" />
                <h3 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center gap-3 relative z-10">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Con Control Stock
                </h3>
                <ul className="space-y-4 text-slate-300 relative z-10">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-1">✓</span>{" "}
                    Actualizaciones en tiempo real.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-1">✓</span> Alertas
                    automáticas inteligentes.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-1">✓</span> Tu equipo
                    siempre en la misma página.
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* TODO PARTE DE PARA OPERAR SIN FRICCION */}
        <section id="caracteristicas" className="py-24 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                Todo para operar sin fricción
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Gestión Ágil",
                  desc: "Agrega, edita y categoriza productos en segundos. Interfaz optimizada para máxima velocidad.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  ),
                },
                {
                  title: "Métricas al Instante",
                  desc: "Dashboard analítico que calcula el valor total de tu inventario y muestra tendencias de movimiento.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  ),
                },
                {
                  title: "Actualización en tiempo real",
                  desc: "Nuestra arquitectura asegura que si un cajero descuenta un stock, tú lo ves reflejado en milisegundos.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  ),
                },
              ].map((feature, i) => (
                <FadeIn key={i} delay={`delay-${i * 100}`}>
                  <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 hover:bg-slate-800/80 transition-colors h-full">
                    <div className="w-15 h-16 rounded-full  bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {feature.icon}
                      </svg>
                    </div>
                    <h3 className="text-xl text-center font-bold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-center text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-16">
              Tres pasos para el control total
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-500/50" />
            {[
              {
                step: "1",
                title: "Importa tus datos",
                desc: "Sube tu catálogo actual o agrégalo fácilmente desde la interfaz intuitiva.",
              },
              {
                step: "2",
                title: "Ajusta Alertas",
                desc: "Define niveles mínimos para cada producto y deja que el sistema vigile por ti.",
              },
              {
                step: "3",
                title: "Toma Decisiones",
                desc: "Usa los reportes visuales para comprar inteligentemente y maximizar ganancias.",
              },
            ].map((item, i) => (
              <FadeIn
                key={i}
                delay={`delay-${i * 100}`}
                className="relative z-10"
              >
                <div className="w-24 h-24 mx-auto bg-slate-950 border-4 border-indigo-500 rounded-full flex items-center justify-center text-3xl font-black text-indigo-400 mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Separador de color */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-600" />

        {/* Sección: Métricas Clave */}
        <section
          id="metricas"
          className="py-24 px-6 bg-slate-950 border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Resultados que hablan por sí solos
                </h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                  Empresas de todos los tamaños confían en Control Stock para
                  mantener su inventario bajo control.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  value: "500+",
                  label: "Empresas activas",
                  icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                  color: "indigo",
                },
                {
                  value: "99.9%",
                  label: "Uptime garantizado",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  color: "emerald",
                },
                {
                  value: "2M+",
                  label: "Productos gestionados",
                  icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                  color: "purple",
                },
                {
                  value: "3 min",
                  label: "Tiempo de configuración",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  color: "amber",
                },
              ].map((stat, i) => (
                <FadeIn key={i} delay={`delay-${i * 100}`}>
                  <div className="relative group bg-slate-900 border border-white/5 rounded-2xl p-8 text-center hover:border-indigo-500/30 transition-all duration-300 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-${stat.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity`}
                    />
                    <div
                      className={`w-12 h-12 mx-auto rounded-xl bg-${stat.color}-500/10 flex items-center justify-center mb-5`}
                    >
                      <svg
                        className={`w-6 h-6 text-${stat.color}-400`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={stat.icon}
                        />
                      </svg>
                    </div>
                    <p
                      className={`text-4xl font-extrabold text-${stat.color}-400 mb-2`}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-400 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Barra de progreso visual */}
            <FadeIn delay="delay-400">
              <div className="mt-16 grid md:grid-cols-3 gap-8">
                {[
                  { label: "Reducción de errores de stock", pct: 94 },
                  { label: "Ahorro de tiempo operativo", pct: 78 },
                  { label: "Satisfacción del cliente", pct: 97 },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-slate-300">
                        {bar.label}
                      </span>
                      <span className="text-sm font-bold text-indigo-400">
                        {bar.pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        style={{ width: `${bar.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Lo que dicen nuestros clientes */}

        <section id="testimonios" className="py-24 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                Lo que dicen nuestros clientes
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Laura Gómez",
                  role: "Gerente de Retail",
                  text: "Pasamos de perder ventas por falta de stock a tener un inventario optimizado. La interfaz es increíblemente rápida.",
                },
                {
                  name: "Carlos Ruiz",
                  role: "Dueño de Ferretería",
                  text: "Manejar miles de SKUs era una pesadilla. Control Stock nos simplificó la vida y el dashboard es muy claro.",
                },
                {
                  name: "Ana Martínez",
                  role: "Directora de Operaciones",
                  text: "La sincronización en tiempo real nos permite tener 3 sucursales conectadas sin errores de inventario.",
                },
              ].map((testi, i) => (
                <FadeIn key={i} delay={`delay-${i * 100}`}>
                  <div className="bg-slate-950 border border-white/5 rounded-2xl p-8 relative">
                    <svg
                      className="absolute top-6 right-6 w-8 h-8 text-indigo-500/20"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm18 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                    </svg>
                    <p className="text-slate-300 italic mb-6 relative z-10">
                      "{testi.text}"
                    </p>
                    <div>
                      <h4 className="font-bold text-white">{testi.name}</h4>
                      <p className="text-sm text-slate-500">{testi.role}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section id="newsletter" className="py-32 px-6">
          <FadeIn>
            <div className="max-w-6xl mx-auto rounded-[3rem] bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 p-8 md:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Columna Izquierda: CTA original */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/10 shadow-xl mb-8 backdrop-blur-sm">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Listo para modernizar tu negocio?
                  </h2>
                  <p className="text-xl text-indigo-200 mb-10 max-w-lg mx-auto lg:mx-0">
                    Únete a la plataforma que está cambiando la forma en que los
                    negocios controlan sus productos.
                  </p>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-10 py-5 rounded-full bg-white text-indigo-950 font-bold text-lg hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
                  >
                    Crear cuenta gratis ahora
                  </button>
                </div>

                {/* Columna Derecha: Newsletter Form */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    Únete a nuestro boletín
                  </h3>
                  <p className="text-indigo-200/80 mb-8 text-sm leading-relaxed">
                    Recibe consejos de inventario, actualizaciones exclusivas y
                    estrategias de crecimiento directamente en tu correo.
                  </p>

                  <form
                    className="space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.target.reset();
                      triggerToast(
                        "¡Gracias por suscribirte al newsletter! 📧",
                        "success",
                      );
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-indigo-200/70 mb-2 ml-1">
                          Nombre
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Carlos"
                          className="w-full bg-black/20 border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all placeholder:text-white/20 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-indigo-200/70 mb-2 ml-1">
                          Apellido
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Mendoza"
                          className="w-full bg-black/20 border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all placeholder:text-white/20 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-indigo-200/70 mb-2 ml-1">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tu@empresa.com"
                        className="w-full bg-black/20 border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all placeholder:text-white/20 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 mt-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
                    >
                      <span>Suscribirme ahora</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-500 to-purple-600 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center shadow-inner">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                />
              </svg>
            </div>
            <span className="font-bold text-xl text-white">Control Stock</span>
          </div>

          <div className="flex gap-8 text-sm font-medium text-white/80">
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Soporte
            </a>
          </div>

          <p className="text-white/60 text-sm">© 2026 Control Stock Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
