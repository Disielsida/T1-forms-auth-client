import { User } from '@shared/types/user';

interface Props {
  users: User[];
}

export const UserTable = ({ users }: Props) => {
  if (users.length === 0) {
    return <p>Пользователей пока нет</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>ФИО</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.fullName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
