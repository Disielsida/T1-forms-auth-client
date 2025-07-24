import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@pages/Home';
import { LoginPage } from '@pages/Login';
import { PrivateRoute } from '@shared/lib/routing/PrivateRoute';
import { ROUTES } from '@shared/config/routes';
import { useInitAuth } from '@shared/lib/hooks/useInitAuth';
import { Layout } from '@widgets/Layout';

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
      </Route>
    </Routes>
  );
};
