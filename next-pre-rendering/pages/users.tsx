import { GetStaticProps, NextPage } from 'next';
import User from '../components/User';
import { IUser } from '../interfaces';

interface UsersProps {
  users: IUser[];
}

const Users: NextPage<UsersProps> = ({ users }) => (
  <div>
    <h1>Users</h1>
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <User {...user} />
        </li>
      ))}
    </ul>
  </div>
);

export default Users;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  return { props: { users } };
};
