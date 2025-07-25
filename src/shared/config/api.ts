const BASE = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

export const API_BASE_URL = BASE;

export const apiRoutes = {
  users: `${BASE}/users`,
  userById: (id: string) => `${BASE}/users/${id}`,
  auth: {
    login: `${BASE}/auth/login`,
    logout: `${BASE}/auth/logout`,
    me: `${BASE}/auth/me`,
  },
};
