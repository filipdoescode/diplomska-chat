import { useContext } from 'react';

import { ChatContext } from '@/src/context/chat-context';

export function useChat() {
  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    throw new Error('useChat has to be used within <ChatContext.Provider>');
  }

  return chatContext;
}
