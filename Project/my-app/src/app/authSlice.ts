import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '../api/userService';
import { authService } from '../api/userService';
import type { RootState } from './store';
import { authUtils } from '../utils/authUtils';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  modalView: 'login' | 'register' | 'success' | 'closed';
  showWelcomeScreen: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  modalView: 'closed',
  showWelcomeScreen: true,
};

export const checkSessionAndLoadProfile = createAsyncThunk(
  'auth/checkSessionAndLoadProfile',
  async (_, { rejectWithValue }) => {
    try {
      const profile = await authService.getProfile();
      return { user: profile, isAuthenticated: true };
    } catch (error) {
      if (error instanceof Error && 
          (error.message.includes('401') || 
           error.message.includes('403') ||
           error.message.includes('Unauthorized'))) {
        return { user: null, isAuthenticated: false };
      }

      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      await authService.login(credentials.email, credentials.password);
      const profile = await authService.getProfile();
      return profile;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { 
    email: string; 
    password: string; 
    name: string; 
    surname: string 
  }, { rejectWithValue }) => {
    try {
      const response = await authService.register(
        userData.email, 
        userData.password, 
        userData.name, 
        userData.surname
      );
      
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ошибка регистрации');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      authUtils.clearAuthData();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      authUtils.clearAuthData();
    },
    openModal: (state, action: PayloadAction<'login' | 'register'>) => {
      state.modalView = action.payload;
    },
    closeModal: (state) => {
      state.modalView = 'closed';
    },
    setModalView: (state, action: PayloadAction<'login' | 'register' | 'success' | 'closed'>) => {
      state.modalView = action.payload;
    },
    hideWelcomeScreen: (state) => {
    state.showWelcomeScreen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSessionAndLoadProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkSessionAndLoadProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.error = null;
      })
      .addCase(checkSessionAndLoadProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
        authUtils.clearAuthData();
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.modalView = 'success';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        authUtils.clearAuthData();
})
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectUserName = (state: RootState) => 
  state.auth.user ? `${state.auth.user.name} ${state.auth.user.surname}` : '';
export const selectModalView = (state: RootState) => state.auth.modalView;
export const selectShowWelcomeScreen = (state: RootState) => state.auth.showWelcomeScreen;

export const { setUser, clearUser, setLoading, setError, clearError, clearAuth, openModal, closeModal, setModalView, } = authSlice.actions;
export default authSlice.reducer;