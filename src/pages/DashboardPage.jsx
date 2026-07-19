import { useState, useMemo } from "react";
import StatCard from "../components/StatCard";
import { useProducts } from "../hooks/useProducts";
import { useUI } from "../hooks/useUI";
import { STOCK_THRESHOLD } from "../constants/inventory";

const icons = {
  box: (
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  alert: (
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
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  dollar: (
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
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  outOfStock: (
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
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
  chart: (
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
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
};

const CategoryBar = ({ label, count, total, color }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <p className="text-xs text-gray-500 dark:text-gray-400 w-24 flex-shrink-0 truncate">
        {label}
      </p>
      <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 w-8 text-right">
        {count}
      </p>
    </div>
  );
};

const RecentProductRow = ({ product, rank }) => {
  const isLow = product.quantity <= STOCK_THRESHOLD && product.quantity > 0;
  const isOut = product.quantity === 0;
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-100 dark:border-white/[0.04] last:border-0">
      <span className="text-xs text-gray-400 dark:text-gray-600 w-5 text-right font-mono">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate">
          {product.name}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600">
          {product.category}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          ${(product.price * product.quantity).toFixed(0)}
        </p>
        <p
          className={`text-xs font-medium ${isOut ? "text-rose-500 dark:text-rose-400" : isLow ? "text-amber-500 dark:text-amber-400" : "text-gray-400 dark:text-gray-500"}`}
        >
          {isOut
            ? "⊘ Sin stock"
            : isLow
              ? `⚠ ${product.quantity} uds`
              : `${product.quantity} uds`}
        </p>
      </div>
    </div>
  );
};

const DONUT_COLORS = [
  {
    stroke: "#6366f1",
    bg: "bg-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  {
    stroke: "#a855f7",
    bg: "bg-purple-500",
    text: "text-purple-600 dark:text-purple-400",
  },
  {
    stroke: "#10b981",
    bg: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  {
    stroke: "#f59e0b",
    bg: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  {
    stroke: "#f43f5e",
    bg: "bg-rose-500",
    text: "text-rose-600 dark:text-rose-400",
  },
  {
    stroke: "#3b82f6",
    bg: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
  },
  {
    stroke: "#14b8a6",
    bg: "bg-teal-500",
    text: "text-teal-600 dark:text-teal-400",
  },
];

const CategoryDonut = ({ products }) => {
  const [hovered, setHovered] = useState(null);

  const { total, arcs, cx, cy, R, r, circumference } = useMemo(() => {
    const byCategory = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.price * p.quantity;
      return acc;
    }, {});

    const entriesData = Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value], i) => ({
        name,
        value,
        color: DONUT_COLORS[i % DONUT_COLORS.length],
      }));

    const totalValue = entriesData.reduce((s, e) => s + e.value, 0);

    const radiusOuter = 60;
    const radiusInner = 38;
    const centerX = 80;
    const centerY = 80;
    const circ = 2 * Math.PI * radiusOuter;

    const arcsData = entriesData.map((entry, index) => {
      const pct = totalValue > 0 ? entry.value / totalValue : 0;
      const dash = pct * circ;
      const gap = circ - dash;
      
      const offset = entriesData.slice(0, index).reduce((sum, prevEntry) => {
        const prevPct = totalValue > 0 ? prevEntry.value / totalValue : 0;
        return sum + (prevPct * circ);
      }, 0);

      return { ...entry, pct, dash, gap, offset };
    });

    return { 
      total: totalValue, 
      arcs: arcsData, 
      entries: entriesData,
      cx: centerX,
      cy: centerY,
      R: radiusOuter,
      r: radiusInner,
      circumference: circ
    };
  }, [products]);

  const hoveredEntry = hovered !== null ? arcs[hovered] : null;

  if (products.length === 0) {
    return (
      <p className="text-xs text-gray-400 text-center py-10">
        Agrega productos al inventario para ver el gráfico
      </p>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
      <div className="relative flex-shrink-0">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth={R - r}
            className="text-gray-100 dark:text-gray-700"
          />

          {arcs.map((arc, i) => (
            <circle
              key={arc.name}
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke={arc.color.stroke}
              strokeDasharray={`${arc.dash - 2} ${arc.gap + 2}`}
              strokeDashoffset={-arc.offset + circumference / 4}
              opacity={hovered === null || hovered === i ? 1 : 0.35}
              strokeWidth={hovered === i ? R - r + 4 : R - r}
              style={{ transition: "opacity 0.2s, stroke-width 0.2s" }}
              className="cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {hoveredEntry ? (
            <>
              <span
                className={`text-xs font-semibold ${hoveredEntry.color.text} text-center leading-tight max-w-[70px] line-clamp-2`}
              >
                {hoveredEntry.name}
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                {(hoveredEntry.pct * 100).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ${hoveredEntry.value.toFixed(0)}
              </span>
            </>
          ) : (
            <>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Total
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                $
                {total >= 1000
                  ? (total / 1000).toFixed(1) + "k"
                  : total.toFixed(0)}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 w-full">
        {arcs.map((arc, i) => (
          <div
            key={arc.name}
            className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl transition-all cursor-default
              ${
                hovered === i
                  ? "bg-gray-100 dark:bg-white/5"
                  : "hover:bg-gray-50 dark:hover:bg-white/[0.03]"
              }`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${arc.color.bg}`}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                {arc.name}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className={`text-xs font-semibold ${arc.color.text}`}>
                {(arc.pct * 100).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                $
                {arc.value.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



const DashboardPage = () => {
  const { products, stats } = useProducts();
  const { setCurrentView } = useUI();

  const byCategory = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const categoryColors = [
    "bg-indigo-500",
    "bg-purple-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-blue-500",
    "bg-teal-500",
  ];

  const sortedCategories = Object.entries(byCategory).sort(
    (a, b) => b[1] - a[1],
  );

  const topByValue = [...products]
    .sort((a, b) => b.price * b.quantity - a.price * a.quantity)
    .slice(0, 5);

  const lowStockProducts = products
    .filter((p) => p.quantity <= STOCK_THRESHOLD)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 5);

  return (
    <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Resumen General
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Visión global del inventario en tiempo real
          </p>
        </div>
        <button
          id="go-to-inventory-btn"
          onClick={() => setCurrentView("inventory")}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-lg shadow-indigo-500/20 flex-shrink-0"
        >
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="hidden sm:inline">Nuevo producto</span>
          <span className="sm:hidden">Nuevo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="Total de Productos"
          value={stats.totalProducts}
          icon={icons.box}
          accent="indigo"
          subLabel="Artículos registrados"
        />
        <StatCard
          label="Valor del Inventario"
          value={`$${stats.totalValue.toLocaleString("es", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={icons.dollar}
          accent="emerald"
          subLabel="Valor total en stock"
        />
        <StatCard
          label="Stock Bajo"
          value={stats.lowStockCount}
          icon={icons.alert}
          accent="amber"
          subLabel={`Productos con ≤ ${STOCK_THRESHOLD} unidades`}
        />
        <StatCard
          label="Sin Stock"
          value={stats.outOfStockCount}
          icon={icons.outOfStock}
          accent="rose"
          subLabel="Requieren reposición urgente"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 p-5 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              {icons.chart}
            </div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              Por Categoría
            </h3>
          </div>
          {sortedCategories.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-6">
              Sin datos disponibles
            </p>
          ) : (
            <div className="space-y-3">
              {sortedCategories.map(([cat, count], idx) => (
                <CategoryBar
                  key={cat}
                  label={cat}
                  count={count}
                  total={products.length}
                  color={categoryColors[idx % categoryColors.length]}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 p-5 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              {icons.dollar}
            </div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              Mayor Valor
            </h3>
          </div>
          {topByValue.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-6">
              Sin productos
            </p>
          ) : (
            <div>
              {topByValue.map((p, i) => (
                <RecentProductRow key={p.id} product={p} rank={i + 1} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 p-5 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              {icons.alert}
            </div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              Alertas de Stock
            </h3>
          </div>
          {lowStockProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 gap-2 text-emerald-500 dark:text-emerald-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-xs text-emerald-600">
                Todo el stock está en orden
              </p>
            </div>
          ) : (
            <div>
              {lowStockProducts.map((p, i) => (
                <RecentProductRow key={p.id} product={p} rank={i + 1} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-transparent dark:glass rounded-2xl border border-gray-200 dark:border-white/5 p-5 shadow-sm dark:shadow-none lg:col-span-3">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              {icons.chart}
            </div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              Valor del Inventario por Categoría
            </h3>
          </div>
          <CategoryDonut products={products} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
