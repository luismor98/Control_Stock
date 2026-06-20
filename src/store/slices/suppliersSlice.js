import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    setSuppliers: (state, action) => {
      state.items = action.payload;
    },
    addSupplier: (state, action) => {
      state.items.push(action.payload);
    },
    updateSupplier: (state, action) => {
      const index = state.items.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteSupplier: (state, action) => {
      state.items = state.items.filter(s => s.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const {
  setSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  setLoading,
  setError
} = suppliersSlice.actions;

export default suppliersSlice.reducer;
