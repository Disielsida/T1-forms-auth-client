import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from '@admiral-ds/react-ui';
import { useAppSelector } from '@shared/lib/hooks/redux';
import { ROUTES } from '@shared/config/routes';

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
  const { isAuth, isAuthChecked } = useAppSelector((state) => state.auth);

  if (!isAuthChecked) {
    return <Spinner dimension="l" />;
  }

  if (!isAuth) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <>{children}</>;
};
