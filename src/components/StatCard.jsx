
const StatCard = ({ label, value, icon, accent, subLabel }) => {
  const accents = {
    indigo: {
      bg: "from-indigo-50 to-indigo-100/60 dark:from-indigo-600/20 dark:to-indigo-900/10",
      icon: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
      border: "border-indigo-200 dark:border-indigo-500/20",
      glow: "shadow-indigo-100 dark:shadow-indigo-500/10",
      value: "text-indigo-700 dark:text-indigo-300",
    },
    purple: {
      bg: "from-purple-50 to-purple-100/60 dark:from-purple-600/20 dark:to-purple-900/10",
      icon: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-500/20",
      glow: "shadow-purple-100 dark:shadow-purple-500/10",
      value: "text-purple-700 dark:text-purple-300",
    },
    amber: {
      bg: "from-amber-50 to-amber-100/60 dark:from-amber-600/20 dark:to-amber-900/10",
      icon: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-500/20",
      glow: "shadow-amber-100 dark:shadow-amber-500/10",
      value: "text-amber-700 dark:text-amber-300",
    },
    emerald: {
      bg: "from-emerald-50 to-emerald-100/60 dark:from-emerald-600/20 dark:to-emerald-900/10",
      icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-500/20",
      glow: "shadow-emerald-100 dark:shadow-emerald-500/10",
      value: "text-emerald-700 dark:text-emerald-300",
    },
    rose: {
      bg: "from-rose-50 to-rose-100/60 dark:from-rose-600/20 dark:to-rose-900/10",
      icon: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
      border: "border-rose-200 dark:border-rose-500/20",
      glow: "shadow-rose-100 dark:shadow-rose-500/10",
      value: "text-rose-700 dark:text-rose-300",
    },
  };

  const style = accents[accent] || accents.indigo;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.bg} border ${style.border} shadow-xl ${style.glow} p-5 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-default`}
    >
      
      <div
        className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${style.icon} blur-2xl opacity-40`}
      />

      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <span
          className={`w-10 h-10 rounded-xl ${style.icon} flex items-center justify-center flex-shrink-0`}
        >
          {icon}
        </span>
      </div>

      <div>
        <p className={`text-3xl font-bold ${style.value} leading-none`}>
          {value}
        </p>
        {subLabel && <p className="text-xs text-gray-500 mt-1.5">{subLabel}</p>}
      </div>
    </div>
  );
};

export default StatCard;
