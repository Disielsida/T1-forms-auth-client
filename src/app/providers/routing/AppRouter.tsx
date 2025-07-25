import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@pages/Home';
import { LoginPage } from '@pages/Login';
import { CreateUserPage } from '@pages/CreateUser';
import { PrivateRoute } from './PrivateRoute';
import { ROUTES } from '@shared/config/routes';
import { useInitAuth } from '@features/auth/lib/hooks/useInitAuth';
import { Layout } from '@widgets/Layout';
import { EditUserPage } from '@pages/EditUser';

export const AppRouter = () => {
  useInitAuth();

  return (
    <Routes>
      <Route path={ROUTES.login} element={<LoginPage />} />

      <Route
        path={ROUTES.root}
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path={ROUTES.userCreate} element={<CreateUserPage />} />
        <Route path={ROUTES.userEdit(':id')} element={<EditUserPage />} />
      </Route>
    </Routes>
  );
};
