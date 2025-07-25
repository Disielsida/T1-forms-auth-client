import { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks/redux';
import { fetchUsersThunk } from '@entities/user/model/thunks/fetchUsers';
import { deleteUserThunk } from '@entities/user/model/thunks/deleteUser';
import { selectUsers, selectIsLoadingUsers, selectUserError } from '@entities/user/model/userSlice';
import { UserTable } from '@widgets/UsersTable';
import { DeleteUserModal } from '@widgets/DeleteUserModal';
import { T, Spinner } from '@admiral-ds/react-ui';
import type { User } from '@shared/types/user';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const isLoading = useAppSelector(selectIsLoadingUsers);
  const error = useAppSelector(selectUserError);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const openDeleteModal = useCallback((user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedUser(null);
    setIsModalOpen(false);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!selectedUser) return;

    try {
      await dispatch(deleteUserThunk(selectedUser.id)).unwrap();
    } catch (err) {
      console.error('Ошибка при удалении пользователя:', err);
    } finally {
      closeModal();
    }
  }, [dispatch, selectedUser, closeModal]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleInner}>
            <T as="span" font="Header/HL3" className={styles.title}>
              Список пользователей
            </T>
            <div className={styles.titleUnderline} />
          </div>
        </div>

        {isLoading && (
          <div className={styles.spinnerWrapper}>
            <Spinner dimension="l" />
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!isLoading && !error && <UserTable users={users} onDeleteClick={openDeleteModal} />}

        <DeleteUserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
          userName={selectedUser?.fullName || selectedUser?.email}
        />
      </div>
    </div>
  );
};
