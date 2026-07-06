import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: true,
  currentView: "dashboard",
  toast: {
    show: false,
    message: "",
    type: "success",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    showToast: (state, action) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || "success",
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  setCurrentView,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;
