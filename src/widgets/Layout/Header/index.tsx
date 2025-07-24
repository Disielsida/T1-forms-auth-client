import { T } from '@admiral-ds/react-ui';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <T as="h1" font="Header/H4">
        T1-Forms-auth
      </T>
    </header>
  );
};
