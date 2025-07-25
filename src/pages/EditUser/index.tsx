// pages/EditUserPage.tsx

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { T } from '@admiral-ds/react-ui';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks/redux';
import { getUserByIdThunk } from '@entities/user/model/thunks/getUserById';
import { selectSelectedUser } from '@entities/user/model/userSlice';
import { UserEditForm } from '@features/user-edit/ui/UserEditForm';
import styles from './CreateUserPage.module.css'; // можно и отдельный, если хочешь

export const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectSelectedUser);

  useEffect(() => {
    if (id) {
      dispatch(getUserByIdThunk(id));
    }
  }, [dispatch, id]);

  if (!user) return null; // Пока не загрузилось — можно показать спиннер

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <div className={styles.titleInner}>
              <T as="span" font="Header/HL3" className={styles.title}>
                Редактирование пользователя
              </T>
              <div className={styles.titleUnderline} />
            </div>
          </div>
          <UserEditForm />
        </div>
      </div>
    </div>
  );
};
