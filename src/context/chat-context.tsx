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
  connect: () => void;
  enterRoom(name: string, room: string): void;
  sendMessage(name: string, text: string): void;
}

const chatDefaults: ChatContextProps = {
  connection: {
    connected: false,
    name: '',
    room: '',
  },
  messages: [],
  userList: [],
  connect: () => {},
  enterRoom: () => {},
  sendMessage: () => {},
};

export const ChatContext = createContext<ChatContextProps>(chatDefaults);

interface ChatProviderProps {
  children: React.ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [connection, setConnection] = useState<Connection>(
    chatDefaults.connection
  );

  const [messages, setMessages] = useState<Message[]>(chatDefaults.messages);
  const [userList, setUserList] = useState<User[]>(chatDefaults.userList);

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

  useEffect(() => {
    connect();

    function handleDisconnect() {
      setConnection(chatDefaults.connection);
    }

    function handleMessages(data: Message) {
      setMessages((prev) => [...prev, data]);
    }

    function handleUsersList(data: { users: User[] }) {
      setUserList(data.users);
    }

    socket.on('message', handleMessages);

    socket.on('userList', handleUsersList);

    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('message', handleMessages);
      socket.off('userList', handleUsersList);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  const value = {
    connection,
    messages,
    userList,
    connect,
    enterRoom,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
