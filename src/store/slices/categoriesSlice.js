import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiService from '../../services/apiService';

const UNCATEGORIZED = {
  id: 0,
  name: "Sin categoría",
  description: "Categoría por defecto para productos sin asignar",
  protected: true,
};

// Thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await apiService.getCategories();
      
      const hasUncategorized = categories.some(c => c.name === UNCATEGORIZED.name);
      if (hasUncategorized) {
        return categories;
      } else {
        return [UNCATEGORIZED, ...categories];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCategoryAsync = createAsyncThunk(
  'categories/addCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const newCategoryData = { ...categoryData, protected: false };
      const newCategory = await apiService.addCategory(newCategoryData);
      return newCategory;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  'categories/updateCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      await apiService.updateCategory(categoryData.id, categoryData);
      return categoryData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // addCategory
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // updateCategory
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...action.payload, protected: state.items[index].protected };
        }
      })
      // deleteCategory
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
