export const API_BASE_URL = '/api/v1';

export const apiRoutes = {
  users: `${API_BASE_URL}/users`,
  userById: (id: string) => `${API_BASE_URL}/users/${id}`,
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    me: `${API_BASE_URL}/auth/me`,
  },
};
