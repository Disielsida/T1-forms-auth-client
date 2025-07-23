export const ROUTES = {
  root: '/',
  login: '/login',
  userCreate: '/user/create',
  userEdit: (id: string) => `/user/${id}/edit`,
};
