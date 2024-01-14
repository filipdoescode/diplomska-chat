import { useContext } from 'react';

import { ChatContext, type ChatContextProps } from '@/src/context/chat-context';

export function useChat(): ChatContextProps {
  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    throw new Error('useChat has to be used within <ChatContext.Provider>');
  }

  return chatContext;
}
