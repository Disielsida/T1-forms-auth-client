import { T } from '@admiral-ds/react-ui';
import { UserCreateForm } from '@features/user-create/ui/UserCreateForm';
import styles from './CreateUserPage.module.css';

export const CreateUserPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <div className={styles.titleInner}>
              <T as="span" font="Header/HL3" className={styles.title}>
                Создание пользователя
              </T>
              <div className={styles.titleUnderline} />
            </div>
          </div>
          <UserCreateForm />
        </div>
      </div>
    </div>
  );
};
