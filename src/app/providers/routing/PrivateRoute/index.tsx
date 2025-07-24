import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from '@admiral-ds/react-ui';
import { useAppSelector } from '@shared/lib/hooks/redux';
import { ROUTES } from '@shared/config/routes';
import styles from './PrivateRoute.module.css';

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
  const { isAuth, isAuthChecked } = useAppSelector((state) => state.auth);

  if (!isAuthChecked) {
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner dimension="l" />
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <>{children}</>;
};
