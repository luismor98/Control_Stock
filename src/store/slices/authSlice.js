import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MOCK_ADMIN = {
  id: 'user_admin_001',
  name: 'Administrador Principal',
  email: 'admin@controlstock.com',
  password: 'admin123',
  rol: 'admin'
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    // Simular un retardo de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      credentials.email === MOCK_ADMIN.email &&
      credentials.password === MOCK_ADMIN.password
    ) {
      // Devolvemos el usuario sin la contraseña por seguridad
      const { password, ...userWithoutPassword } = MOCK_ADMIN;
      return userWithoutPassword;
    }

    // Para efectos de demostración, cualquier otro usuario se loguea como 'standard'
    // En un entorno real validaríamos contra una DB.
    if (credentials.email && credentials.password) {
      return {
        id: `user_${Date.now()}`,
        name: credentials.email.split('@')[0],
        email: credentials.email,
        rol: 'standard',
      };
    }

    return rejectWithValue('Credenciales incorrectas');
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (userData.email === MOCK_ADMIN.email) {
      return rejectWithValue('El correo ya está registrado');
    }

    return {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      rol: 'standard',
    };
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || 'Error de inicio de sesión';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || 'Error de registro';
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  }
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
