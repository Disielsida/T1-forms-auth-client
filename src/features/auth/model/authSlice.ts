import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { User } from '@shared/types/user';
import { loginThunk } from './thunks/login';
import { fetchCurrentUserThunk } from './thunks/fetchCurrentUser';
import { logoutThunk } from './thunks/logout';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuth: boolean;
  isAuthChecked: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuth: false,
  isAuthChecked: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuth = false;
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchCurrentUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;
        state.isAuthChecked = true;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;
        state.isAuthChecked = true;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
