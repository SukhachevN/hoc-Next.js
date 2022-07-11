import { IUser } from '../interfaces';

const User: React.FC<IUser> = ({ name, email }) => (
  <>
    <p>{name}</p>
    <p>{email}</p>
  </>
);

export default User;
