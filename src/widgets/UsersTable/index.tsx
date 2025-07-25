import * as React from 'react';
import { Table, T } from '@admiral-ds/react-ui';
import type { Column, TableRow } from '@admiral-ds/react-ui';
import { User } from '@shared/types/user';

interface Props {
  users: User[];
}

const columns: Column[] = [
  { name: 'fullName', title: 'ФИО' },
  { name: 'email', title: 'Email' },
  { name: 'telephone', title: 'Телефон' },
  { name: 'employment', title: 'Тип занятости' },
  { name: 'birthDate', title: 'Дата рождения' },
];

export const UserTable = ({ users }: Props) => {
  const rows: TableRow[] = users.map((user) => ({
    id: user.id.toString(),
    fullName: <T font="Body/Body 2 Short">{user.fullName}</T>,
    email: <T font="Body/Body 2 Short">{user.email}</T>,
    telephone: <T font="Body/Body 2 Short">{user.telephone || '-'}</T>,
    employment: <T font="Body/Body 2 Short">{user.employment || '-'}</T>,
    birthDate: (
      <T font="Body/Body 2 Short">
        {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : '-'}
      </T>
    ),
  }));

  return <Table columnList={columns} rowList={rows} />;
};
