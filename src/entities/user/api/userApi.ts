import { CreateUserDto, UpdateUserDto, User } from '@shared/types/user';
import { apiRoutes } from '@shared/config/api';

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(apiRoutes.users);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const createUser = async (data: CreateUserDto): Promise<User> => {
  const res = await fetch(apiRoutes.users, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
};

export const updateUser = async (id: string, data: UpdateUserDto): Promise<User> => {
  const res = await fetch(apiRoutes.userById(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
};

export const deleteUser = async (id: string): Promise<void> => {
  const res = await fetch(apiRoutes.userById(id), {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete user');
};
