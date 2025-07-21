import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '@entities/user/api/userApi';
import { User } from '@shared/types/user';

export const fetchUsersThunk = createAsyncThunk<User[]>('user/fetchAll', async (_, thunkAPI) => {
  try {
    const users = await fetchUsers();
    return users;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Failed to fetch users: ${error}`);
  }
});
