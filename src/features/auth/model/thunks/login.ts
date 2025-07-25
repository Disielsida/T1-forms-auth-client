import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from '@shared/config/api';
import { LoginDto } from '@shared/types/auth';

export const loginThunk = createAsyncThunk<void, LoginDto, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('🧪 loginThunk URL:', apiRoutes.auth.login);
      const { email, password } = credentials;

      const response = await fetch(apiRoutes.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue(`Login failed: ${error}`);
    }
  },
);
