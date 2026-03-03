import { Navbar } from '@/src/components/navbar';
import { Button } from './ui/button';
import { useChat } from '../hooks/useChat';

export function Header() {
  const { connection, handleDisconnect } = useChat();
  return (
    <header className='flex px-10 py-2 border shadow-sm'>
      <Navbar />

      {connection.connected && (
        <Button
          onClick={handleDisconnect}
          variant='destructive'
          size='sm'
          className='h-auto'
        >
          Одјави се
        </Button>
      )}
    </header>
  );
}
