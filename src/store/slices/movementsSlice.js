import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apiService from "../../services/apiService";

export const fetchMovements = createAsyncThunk(
  "movements/fetchMovements",
  async (filters, { rejectWithValue }) => {
    try {
      const data = await apiService.getMovements(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  status: "idle",
  error: null,
};

const movementsSlice = createSlice({
  name: "movements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovements.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMovements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default movementsSlice.reducer;
