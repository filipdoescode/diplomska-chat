import { useChat } from '../hooks/useChat';
import { cn } from '../lib/utils';

export function UserList() {
  const { userList, connection } = useChat();

  let content;

  if (userList.length > 0) {
    content = (
      <ul className='overflow-auto'>
        {userList.map((user) => (
          <li key={user.id}>
            <p
              className={cn(
                connection.name === user.name ? 'text-green-600' : 'text-black',
                'font-semibold'
              )}
            >
              {user.name}
            </p>
          </li>
        ))}
      </ul>
    );
  } else {
    content = <p className='font-semibold'>Нема поврзани корисници!</p>;
  }
  return content;
}
