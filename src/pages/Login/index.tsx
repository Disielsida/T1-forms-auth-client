import { LoginForm } from '@features/auth/ui/LoginForm';
import { T } from '@admiral-ds/react-ui';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <div className={styles.content}>
          <T as="h3" font="Header/HL3" className={styles.title}>
            Вход в систему
          </T>
          <div className={styles.titleUnderline} />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
