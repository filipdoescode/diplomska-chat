import { io, Socket } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

// @ts-expect-error undefined gets it from windows.location
export const socket: Socket = io(URL, { autoConnect: false });
