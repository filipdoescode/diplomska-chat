import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import {
  getAllActiveRooms,
  getUser,
  activateUser,
  getUsersInRoom,
  userLeavesApp,
  buildMsg,
} from './chat.js';

import { User } from '../../types/index';

const ADMIN = 'Admin';

export default function initSocketIo(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) {
  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    // Upon connection - only to user
    socket.emit(
      'message',
      buildMsg(ADMIN, 'Добредојте во Разговарај со Славјански :)'),
    );

    socket.on('enterRoom', ({ name, room }: User) => {
      // leave previous room
      const prevRoom = getUser(socket.id)?.room;

      if (prevRoom) {
        socket.leave(prevRoom);
        io.to(prevRoom).emit(
          'message',
          buildMsg(ADMIN, `${name} has left the room`),
        );
      }

      const user = activateUser({ id: socket.id, name, room });

      // Cannot update previous room users list until after the state update in activate user
      if (prevRoom) {
        io.to(prevRoom).emit('userList', {
          users: getUsersInRoom(prevRoom),
        });
      }

      // join room
      socket.join(user.room);

      // To user who joined
      socket.emit(
        'message',
        buildMsg(ADMIN, `Ти се приклучи во собата: ${user.room} `),
      );

      // To everyone else
      socket.broadcast
        .to(user.room)
        .emit('message', buildMsg(ADMIN, `${user.name} влезе во собата!`));

      // Update user list for room
      io.to(user.room).emit('userList', {
        users: getUsersInRoom(user.room),
      });

      // Update rooms list for everyone
      io.emit('roomList', {
        rooms: getAllActiveRooms(),
      });
    });

    // When user disconnects - to all others
    socket.on('disconnect', () => {
      const user = getUser(socket.id);
      userLeavesApp(socket.id);

      if (user) {
        io.to(user.room).emit(
          'message',
          buildMsg(ADMIN, `${user.name} ја напушти собата!`),
        );

        io.to(user.room).emit('userList', {
          users: getUsersInRoom(user.room),
        });

        io.emit('roomList', {
          rooms: getAllActiveRooms(),
        });
      }

      console.log(`User ${socket.id} disconnected`);
    });

    // Listening for a message event
    socket.on('message', ({ name, text }) => {
      const room = getUser(socket.id)?.room;
      if (room) {
        io.to(room).emit('message', buildMsg(name, text));
      }
    });

    // Listen for activity
    socket.on('activity', (name) => {
      const room = getUser(socket.id)?.room;
      if (room) {
        socket.broadcast.to(room).emit('activity', name);
      }
    });
  });
}
