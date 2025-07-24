import { useEffect } from 'react';
import { useAppDispatch } from '@shared/lib/hooks/redux';
import { fetchCurrentUserThunk } from '@features/auth/model/thunks/fetchCurrentUser';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserThunk());
  }, [dispatch]);
};
