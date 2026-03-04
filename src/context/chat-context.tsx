import React, { createContext, useEffect, useState } from 'react';
import { socket } from '@/src/socket';

import { Message, User } from '@/types';

type Connection = {
  connected: boolean;
  name: string;
  room: string;
};

export interface ChatContextProps {
  connection: Connection;
  messages: Message[];
  userList: User[];
  typingUsers: string[];
  connect: () => void;
  enterRoom(name: string, room: string): void;
  sendMessage(name: string, text: string): void;
  handleDisconnect(): void;
  emitTyping(name: string): void;
}

const chatDefaults: ChatContextProps = {
  connection: {
    connected: false,
    name: '',
    room: '',
  },
  messages: [],
  userList: [],
  typingUsers: [],
  connect: () => {},
  enterRoom: () => {},
  sendMessage: () => {},
  handleDisconnect: () => {},
  emitTyping: () => {},
};

export const ChatContext = createContext<ChatContextProps>(chatDefaults);

interface ChatProviderProps {
  children: React.ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [connection, setConnection] = useState<Connection>(
    chatDefaults.connection,
  );

  const [messages, setMessages] = useState<Message[]>(chatDefaults.messages);
  const [userList, setUserList] = useState<User[]>(chatDefaults.userList);
  const [typingUsers, setTypingUsers] = useState<string[]>(
    chatDefaults.typingUsers,
  );

  function connect() {
    socket.connect();
  }

  function enterRoom(name: string, room: string) {
    setUserList([]);
    setMessages([]);

    socket.emit('enterRoom', {
      name,
      room,
    });

    setConnection({
      name,
      room,
      connected: true,
    });
  }

  function sendMessage(name: string, text: string) {
    socket.emit('message', {
      name,
      text,
    });
  }

  function handleDisconnect() {
    socket.disconnect();
    setConnection(chatDefaults.connection);
  }

  function emitTyping(name: string) {
    socket.emit('activity', name);
  }

  useEffect(() => {
    connect();

    function handleMessages(data: Message) {
      setMessages((prev) => [...prev, data]);
    }

    function handleUsersList(data: { users: User[] }) {
      setUserList(data.users);
    }

    function handleActivity(name: string) {
      setTypingUsers((prev) => {
        if (!prev.includes(name)) {
          return [...prev, name];
        }
        return prev;
      });

      // Clear typing indicator after 3 seconds of inactivity
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((user) => user !== name));
      }, 3000);
    }

    socket.on('message', handleMessages);

    socket.on('userList', handleUsersList);

    socket.on('activity', handleActivity);

    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('message', handleMessages);
      socket.off('userList', handleUsersList);
      socket.off('activity', handleActivity);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  const value = {
    connection,
    messages,
    userList,
    typingUsers,
    connect,
    enterRoom,
    sendMessage,
    handleDisconnect,
    emitTyping,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
