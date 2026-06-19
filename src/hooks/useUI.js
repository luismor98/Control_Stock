import { useSelector, useDispatch } from 'react-redux';
import { 
  toggleDarkMode as toggleDarkModeAction, 
  setDarkMode, 
  setCurrentView as setCurrentViewAction, 
  showToast, 
  hideToast 
} from '../store/slices/uiSlice';

export const useUI = () => {
  const dispatch = useDispatch();
  const { isDarkMode, currentView, toast } = useSelector((state) => state.ui);

  const toggleDarkMode = () => {
    dispatch(toggleDarkModeAction());
  };

  const initializeDarkMode = (isDark) => {
    dispatch(setDarkMode(isDark));
  };

  const setCurrentView = (view) => {
    dispatch(setCurrentViewAction(view));
  };

  const triggerToast = (message, type = 'success') => {
    dispatch(showToast({ message, type }));
    // Ocultar automáticamente
    setTimeout(() => {
      dispatch(hideToast());
    }, 3500);
  };

  const closeToast = () => {
    dispatch(hideToast());
  };

  return {
    isDarkMode,
    currentView,
    toast,
    toggleDarkMode,
    initializeDarkMode,
    setCurrentView,
    triggerToast,
    closeToast,
  };
};
