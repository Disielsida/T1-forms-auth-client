import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser } from '@entities/user/api/userApi';
import { UpdateUserDto } from '@shared/types/user';

export const editUserThunk = createAsyncThunk<
  void,
  { id: string; dto: UpdateUserDto },
  { rejectValue: string }
>('user/editUser', async ({ id, dto }, { rejectWithValue }) => {
  try {
    await updateUser(id, dto);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Не удалось обновить пользователя';
    return rejectWithValue(message);
  }
});
