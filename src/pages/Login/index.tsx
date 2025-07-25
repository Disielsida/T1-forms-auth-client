import { LoginForm } from '@features/auth/ui/LoginForm';
import { T } from '@admiral-ds/react-ui';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  console.log('VITE_API_BASE_URL =', import.meta.env.VITE_API_BASE_URL);
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <div className={styles.content}>
          <T as="h3" font="Header/HL3" className={styles.titleWrapper}>
            <div className={styles.titleInner}>
              <span className={styles.title}>Вход в систему</span>
              <div className={styles.titleUnderline} />
            </div>
          </T>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
