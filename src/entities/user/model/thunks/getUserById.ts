import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserById } from '@entities/user/api/userApi';
import { User } from '@shared/types/user';

export const getUserByIdThunk = createAsyncThunk<User, string>(
  'user/getById',
  async (id, { rejectWithValue }) => {
    try {
      const user = await getUserById(id);
      return user;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || 'Не удалось получить пользователя');
    }
  },
);
