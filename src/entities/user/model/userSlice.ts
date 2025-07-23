import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@shared/types/user';

type UserState = {
  users: User[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
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
  },

  selectors: {
    selectUsers: (state) => state.users,
    selectIsLoadingUsers: (state) => state.isLoading,
    selectUserError: (state) => state.error,
  },
});

export const { setUsers, setLoading, setError } = userSlice.actions;
export const { selectUsers, selectIsLoadingUsers, selectUserError } = userSlice.selectors;
export default userSlice.reducer;
