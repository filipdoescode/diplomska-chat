declare module '*.svg' {
  const content: any;
  export default content;
}

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
  };
};

export type User = {
  id: string;
  name: string;
  room: string;
};

interface UserState {
  users: User[];
  setUsers: (newUsers: User[]) => void;
}

export type Message = {
  name: string;
  text: string;
  time: string;
};
