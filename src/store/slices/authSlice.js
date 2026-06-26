import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../config/firebase';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true, // Nuevo estado para saber si Firebase está comprobando la sesión inicial
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        credentials.email, 
        credentials.password
      );
      
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        rol: user.email === 'admin@controlstock.com' ? 'admin' : 'operador',
      };
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión';
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Credenciales incorrectas o usuario no registrado.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No hay un usuario registrado con este correo.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'El método de correo/contraseña no está habilitado en Firebase Console.';
      } else if (error.message) {
        errorMessage = `Error de Firebase: ${error.message}`;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );
      
      const user = userCredential.user;
      
      // Actualizar el perfil en Firebase con el nombre
      await updateProfile(user, {
        displayName: userData.name
      });
      
      return {
        uid: user.uid,
        email: user.email,
        displayName: userData.name,
        rol: user.email === 'admin@controlstock.com' ? 'admin' : 'operador',
      };
    } catch (error) {
      let errorMessage = 'Error al registrar el usuario';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'El correo electrónico ya está en uso.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'ATENCIÓN: Debes ir a la consola de Firebase -> Authentication -> Sign-in method, y habilitar "Correo electrónico/Contraseña".';
      } else if (error.message) {
        errorMessage = `Error de Firebase: ${error.message}`;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue('Error al cerrar sesión');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Acción para cuando Firebase reporta el estado de la sesión de forma asíncrona
    setAuthState: (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload;
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
      state.isInitializing = false;
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

export const { clearError, setAuthState } = authSlice.actions;

export default authSlice.reducer;
