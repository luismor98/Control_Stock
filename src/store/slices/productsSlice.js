import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as firestoreService from '../../services/apiService';

const UNCATEGORIZED_NAME = "Sin categoría";

// Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await firestoreService.getProducts();
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const newProduct = await firestoreService.addProduct(productData);
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (productData, { rejectWithValue }) => {
    try {
      await firestoreService.updateProduct(productData.id, productData);
      return productData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await firestoreService.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const migrateProductsCategoryAsync = createAsyncThunk(
  'products/migrateCategory',
  async (oldCategoryName, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const products = state.products.items;
      const productsToMigrate = products.filter(p => p.category === oldCategoryName);
      
      const migratedProducts = [];
      for (const p of productsToMigrate) {
        const updatedProduct = { ...p, category: UNCATEGORIZED_NAME };
        await firestoreService.updateProduct(p.id, updatedProduct);
        migratedProducts.push(updatedProduct);
      }
      return migratedProducts;
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

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // addProduct
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // updateProduct
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // deleteProduct
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      // migrateCategory
      .addCase(migrateProductsCategoryAsync.fulfilled, (state, action) => {
        const migratedProducts = action.payload;
        state.items = state.items.map(p => {
          const migrated = migratedProducts.find(mp => mp.id === p.id);
          return migrated ? migrated : p;
        });
      });
  },
});

export default productsSlice.reducer;
