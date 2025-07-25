import { Table, T, Button } from '@admiral-ds/react-ui';
import type { Column, TableRow } from '@admiral-ds/react-ui';
import { User } from '@shared/types/user';
import styles from './UsersTable.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';

interface Props {
  users: User[];
  onDeleteClick: (user: User) => void;
}

const columns: Column[] = [
  { name: 'idCell', title: 'ID', width: '10%' },
  { name: 'fullName', title: 'ФИО', width: '30%' },
  { name: 'email', title: 'Email', width: '30%' },
  { name: 'edit', title: 'Редактирование', width: '18%' },
  { name: 'delete', title: 'Удаление', width: '12%' },
];

export const UserTable = ({ users, onDeleteClick }: Props) => {
  const navigate = useNavigate();

  const rows: TableRow[] = users.map((user) => ({
    id: user.id,
    idCell: <T font="Body/Body 2 Short">{user.id}</T>,
    fullName: <T font="Body/Body 2 Short">{user.fullName}</T>,
    email: <T font="Body/Body 2 Short">{user.email}</T>,
    edit:
      user.id === '1' ? null : (
        <Button dimension="s" appearance="ghost" onClick={() => navigate(ROUTES.userEdit(user.id))}>
          Редактировать
        </Button>
      ),
    delete:
      user.id === '1' ? null : (
        <Button dimension="s" appearance="ghost" onClick={() => onDeleteClick(user)}>
          Удалить
        </Button>
      ),
  }));

  return <Table columnList={columns} rowList={rows} className={styles.fullWidthTable} />;
};
