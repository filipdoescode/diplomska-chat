import { useChat } from '@/src/hooks/useChat';
import { cn } from '@/src/lib/utils';
import { roomsList } from '@/src/config/chat';

export function RoomsList() {
  const { enterRoom, connection } = useChat();

  return (
    <ul>
      {roomsList.map((room) => (
        <li
          key={room.id}
          className={cn(
            'relative min-h-[100px] border-b cursor-pointer hover:text-white',
            connection.room === room.name && 'text-white pointer-events-none'
          )}
          onClick={() => {
            enterRoom(connection.name, room.name);
          }}
        >
          <img
            src={room.image}
            className={cn(
              'absolute inset-0 w-full h-full overflow-hidden object-cover opacity-40 hover:opacity-80',
              room.name === connection.room && 'opacity-80'
            )}
          />

          <h4 className='relative z-10 text-xl font-bold'>{room.name}</h4>
        </li>
      ))}
    </ul>
  );
}
