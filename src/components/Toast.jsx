

const Toast = ({ show, message, type, onClose }) => {
  if (!show) return null;

  const styles = {
    success: "bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-700/30 dark:border-emerald-600",
    error: "bg-rose-600 dark:bg-rose-500 text-white border-rose-700/30 dark:border-rose-600",
    info: "bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-700/30 dark:border-indigo-600",
  };

  const icons = {
    success: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-xl shadow-black/5 dark:shadow-black/20 animate-slideUpAndFade ${styles[type]}`}>
      {icons[type]}
      <p className="text-sm font-semibold">{message}</p>
      <button 
        onClick={onClose} 
        className="ml-2 opacity-80 hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-white/20 flex-shrink-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
