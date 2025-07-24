import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from '@shared/config/api';

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(apiRoutes.auth.logout, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        return rejectWithValue('Logout failed');
      }
    } catch (error) {
      return rejectWithValue(`Logout error: ${String(error)}`);
    }
  },
);
