import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { 
  toggleDarkMode as toggleDarkModeAction, 
  setDarkMode, 
  setCurrentView as setCurrentViewAction, 
  showToast, 
  hideToast 
} from '../store/slices/uiSlice';

let globalToastTimeout = null;

export const useUI = () => {
  const dispatch = useDispatch();
  const { isDarkMode, currentView, toast } = useSelector((state) => state.ui);

  const toggleDarkMode = useCallback(() => {
    dispatch(toggleDarkModeAction());
  }, [dispatch]);

  const initializeDarkMode = useCallback((isDark) => {
    dispatch(setDarkMode(isDark));
  }, [dispatch]);

  const setCurrentView = useCallback((view) => {
    dispatch(setCurrentViewAction(view));
  }, [dispatch]);

  const triggerToast = useCallback((message, type = 'success') => {
    dispatch(showToast({ message, type }));
    
    if (globalToastTimeout) {
      clearTimeout(globalToastTimeout);
    }
    
    globalToastTimeout = setTimeout(() => {
      dispatch(hideToast());
      globalToastTimeout = null;
    }, 3500);
  }, [dispatch]);

  const closeToast = useCallback(() => {
    if (globalToastTimeout) {
      clearTimeout(globalToastTimeout);
      globalToastTimeout = null;
    }
    dispatch(hideToast());
  }, [dispatch]);

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

