import { useState } from 'react';

import { Chat } from '@/src/components/chat';
import { JoinChatRoomForm } from '@/src/components/join-chat-room-form';

import { useChat } from '@/src/hooks/useChat';

function App() {
  const { connection } = useChat();

  const [open, setOpen] = useState(true);

  function onOpenChange(open: boolean) {
    setOpen(open);
  }

  return (
    <main className='h-[calc(100vh-69.98px)] p-10'>
      {connection.connected ? (
        <Chat />
      ) : (
        <JoinChatRoomForm open={open} onOpenChange={onOpenChange} />
      )}
    </main>
  );
}

export default App;
