import { useChat } from '@/src/hooks/useChat';
import { cn } from '@/src/lib/utils';

export function UserList() {
  const { userList, connection } = useChat();

  let content;

  if (userList.length > 0) {
    content = (
      <ul className='overflow-auto flex flex-col gap-2'>
        {userList.map((user) => (
          <li key={user.id} className='flex items-center gap-2'>
            <span>
              <img
                src={`https://api.dicebear.com/9.x/adventurer/svg?flip=true&backgroundType=gradientLinear,solid&skinColor=ecad80,f2d3b1&backgroundColor=b6e3f4,transparent&seed=${user.name}`}
                width={32}
              />
            </span>
            <p
              className={cn(
                connection.name === user.name ? 'text-green-600' : 'text-black',
                'font-semibold',
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
  return (
    <div>
      <h2>Активни корисници:</h2>
      {content}
    </div>
  );
}
