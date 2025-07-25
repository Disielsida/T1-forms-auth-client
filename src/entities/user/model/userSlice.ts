import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@shared/types/user';
import { fetchUsersThunk } from './thunks/fetchUsers';
import { deleteUserThunk } from './thunks/deleteUser';
import { getUserByIdThunk } from './thunks/getUserById';
import { editUserThunk } from './thunks/editUser';

type UserState = {
  users: User[];
  isLoading: boolean;
  error: string | null;
  selectedUser: User | null;
};

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },

  selectors: {
    selectUsers: (state) => state.users,
    selectIsLoadingUsers: (state) => state.isLoading,
    selectUserError: (state) => state.error,
    selectSelectedUser: (state) => state.selectedUser,
  },

  extraReducers: (builder) => {
    builder
      // Загрузка пользователей
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Удаление пользователя
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Получение пользователя по ID
      .addCase(getUserByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserByIdThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Обновление пользователя
      .addCase(editUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUserThunk.fulfilled, (state, { meta }) => {
        state.isLoading = false;

        const { id, dto } = meta.arg;

        state.users = state.users.map((user) => (user.id === id ? { ...user, ...dto } : user));

        if (state.selectedUser?.id === id) {
          state.selectedUser = { ...state.selectedUser, ...dto };
        }
      })
      .addCase(editUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка при редактировании пользователя';
      });
  },
});

export const { setUsers, setLoading, setError, clearSelectedUser } = userSlice.actions;
export const { selectUsers, selectIsLoadingUsers, selectUserError, selectSelectedUser } =
  userSlice.selectors;
export default userSlice.reducer;
