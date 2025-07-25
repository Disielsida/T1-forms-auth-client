import { T } from '@admiral-ds/react-ui';
import { useAppSelector } from '@shared/lib/hooks/redux';
import { selectCurrentUser } from '@features/auth/model/authSlice';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import styles from './Header.module.css';

export const Header = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <header className={styles.header}>
      <Link to={ROUTES.root} className={styles.link}>
        <T as="h1" font="Header/H3">
          T1-Forms-auth: <span className={styles.email}>{user?.email}</span>
        </T>
      </Link>
    </header>
  );
};
