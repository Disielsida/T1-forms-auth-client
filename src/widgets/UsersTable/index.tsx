import { Table, T, Button } from '@admiral-ds/react-ui';
import type { Column, TableRow } from '@admiral-ds/react-ui';
import { User } from '@shared/types/user';
import styles from './UsersTable.module.css';

interface Props {
  users: User[];
  onDeleteClick: (user: User) => void;
}

const columns: Column[] = [
  { name: 'idCell', title: 'ID', width: '15%' },
  { name: 'fullName', title: 'ФИО', width: '15%' },
  { name: 'email', title: 'Email', width: '15%' },
  { name: 'telephone', title: 'Телефон', width: '15%' },
  { name: 'birthDate', title: 'Дата рождения', width: '15%' },
  { name: 'actions', title: '', width: '25%' },
];

export const UserTable = ({ users, onDeleteClick }: Props) => {
  const rows: TableRow[] = users.map((user) => ({
    id: user.id,
    idCell: <T font="Body/Body 2 Short">{user.id}</T>,
    fullName: <T font="Body/Body 2 Short">{user.fullName}</T>,
    email: <T font="Body/Body 2 Short">{user.email}</T>,
    telephone: <T font="Body/Body 2 Short">{user.telephone || '-'}</T>,
    birthDate: (
      <T font="Body/Body 2 Short">
        {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : '-'}
      </T>
    ),
    actions:
      user.id === '1' ? null : (
        <Button dimension="s" appearance="ghost" onClick={() => onDeleteClick(user)}>
          Удалить
        </Button>
      ),
  }));

  return <Table columnList={columns} rowList={rows} className={styles.fullWidthTable} />;
};
