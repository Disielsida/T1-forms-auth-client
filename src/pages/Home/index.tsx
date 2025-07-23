import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks/redux';
import { fetchUsersThunk } from '@entities/user/model/thunks/fetchUsers';
import { selectUsers, selectIsLoadingUsers, selectUserError } from '@entities/user/model/userSlice';
import { UserTable } from '@widgets/UsersTable';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const isLoading = useAppSelector(selectIsLoadingUsers);
  const error = useAppSelector(selectUserError);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Список пользователей</h2>
      {isLoading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && <UserTable users={users} />}
    </div>
  );
};
