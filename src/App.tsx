import { useState } from 'react';

import { Chat } from '@/src/components/chat';
import { JoinChatRoom } from '@/src/components/join-chat-room';

import { useChat } from '@/src/hooks/useChat';

function App() {
  const { connected } = useChat();

  const [open, setOpen] = useState(true);

  function onOpenChange(open: boolean) {
    setOpen(open);
  }

  return (
    <main className='h-[calc(100vh-69.98px)] p-10'>
      {connected ? (
        <Chat />
      ) : (
        <JoinChatRoom open={open} onOpenChange={onOpenChange} />
      )}
    </main>
  );
}

export default App;
