import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@entities/user/model/userSlice';
import authReducer from '@features/auth/model/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
