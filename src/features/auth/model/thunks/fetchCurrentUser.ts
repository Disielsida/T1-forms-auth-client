import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from '@shared/config/api';
import { User } from '@shared/types/user';

export const fetchCurrentUserThunk = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(apiRoutes.auth.me, {
        credentials: 'include',
      });

      if (!response.ok) {
        return rejectWithValue('Not authenticated');
      }

      return response.json();
    } catch {
      return rejectWithValue('Failed to fetch user');
    }
  },
);
