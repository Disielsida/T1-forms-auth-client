import { CreateUserDto, UpdateUserDto, User } from '@shared/types/user';
import { apiRoutes } from '@shared/config/api';

/**
 * Получить список всех пользователей
 */
export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(apiRoutes.users, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error(`Failed to fetch users: ${res.statusText}`);
  return res.json();
};

/**
 * Создать нового пользователя
 */
export const createUser = async (data: CreateUserDto): Promise<User> => {
  const res = await fetch(apiRoutes.users, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Failed to create user: ${res.statusText}`);
  return res.json();
};

/**
 * Обновить пользователя по ID
 */
export const updateUser = async (id: string, data: UpdateUserDto): Promise<User> => {
  const res = await fetch(apiRoutes.userById(id), {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Failed to update user: ${res.statusText}`);
  return res.json();
};

/**
 * Удалить пользователя по ID
 */
export const deleteUser = async (id: string): Promise<void> => {
  const res = await fetch(apiRoutes.userById(id), {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) throw new Error(`Failed to delete user: ${res.statusText}`);
};
