import { User, UserState } from '../../types/index';

// state
export const UsersState: UserState = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

export function buildMsg(name: string, text: string) {
  return {
    name,
    text,
    time: new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date()),
  };
}

// User functions
export function activateUser({ id, name, room }: User) {
  const user = { id, name, room };
  UsersState.setUsers([
    ...UsersState.users.filter((user) => user.id !== id),
    user,
  ]);
  return user;
}

export function userLeavesApp(id: string) {
  UsersState.setUsers(UsersState.users.filter((user) => user.id !== id));
}

export function getUser(id: string) {
  return UsersState.users.find((user) => user.id === id);
}

export function getUsersInRoom(room: string) {
  return UsersState.users.filter((user) => user.room === room);
}

export function getAllActiveRooms() {
  return Array.from(new Set(UsersState.users.map((user) => user.room)));
}
