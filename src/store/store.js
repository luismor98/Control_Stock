import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categoriesSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import suppliersReducer from './slices/suppliersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
    suppliers: suppliersReducer,
    ui: uiReducer,
  },
  // La configuración de middleware por defecto de RTK ya incluye thunk
});

