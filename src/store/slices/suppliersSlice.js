import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as firestoreService from '../../services/apiService';

// Thunks
export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetchSuppliers',
  async (_, { rejectWithValue }) => {
    try {
      const suppliers = await firestoreService.getSuppliers();
      return suppliers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSupplierAsync = createAsyncThunk(
  'suppliers/addSupplier',
  async (supplierData, { rejectWithValue }) => {
    try {
      const newSupplier = await firestoreService.addSupplier(supplierData);
      return newSupplier;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSupplierAsync = createAsyncThunk(
  'suppliers/updateSupplier',
  async (supplierData, { rejectWithValue }) => {
    try {
      await firestoreService.updateSupplier(supplierData.id, supplierData);
      return supplierData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSupplierAsync = createAsyncThunk(
  'suppliers/deleteSupplier',
  async (id, { rejectWithValue }) => {
    try {
      await firestoreService.deleteSupplier(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchSuppliers
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // addSupplierAsync
      .addCase(addSupplierAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // updateSupplierAsync
      .addCase(updateSupplierAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // deleteSupplierAsync
      .addCase(deleteSupplierAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(s => s.id !== action.payload);
      });
  },
});

export default suppliersSlice.reducer;
