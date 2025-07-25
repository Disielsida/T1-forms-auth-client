import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUser } from '@entities/user/api/userApi';

export const deleteUserThunk = createAsyncThunk<string, string, { rejectValue: string }>(
  'user/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch {
      return rejectWithValue('Не удалось удалить пользователя');
    }
  },
);
