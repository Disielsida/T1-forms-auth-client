import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUser } from '@entities/user/api/userApi';
import { CreateUserDto, User } from '@shared/types/user';

export const createUserThunk = createAsyncThunk<User, CreateUserDto>(
  'user/create',
  async (data, thunkAPI) => {
    try {
      const user = await createUser(data);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  },
);
