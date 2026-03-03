# diplomska-chat — Application Flow & Analysis

## Overview

`diplomska-chat` is a real-time, multi-room chat application built as a full-stack TypeScript project. It lets users pick a display name, join a named room, and exchange messages instantly with others in the same room. The interface is primarily in Macedonian and is deployed at `https://diplomska-chat.onrender.com`.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, React Router DOM, Tailwind CSS, Radix UI, Lucide icons |
| **Forms** | React Hook Form + Zod |
| **Real-time** | Socket.io (server + client) |
| **Backend** | Node.js, Express 4, TypeScript |
| **Build** | Vite (with SSR), pnpm, tsx, nodemon |
| **State** | React Context API (no external state library) |

---

## Application Flow

### 1. Server Bootstrap (`server.ts`)

When the server starts, `createServer()` does three things in sequence:

1. Creates an Express app wrapped in a raw `http.Server` instance.
2. Attaches a **Socket.io** server to that HTTP server — this is what enables WebSocket communication alongside regular HTTP traffic on the same port.
3. Calls `initSocketIo(io)` to register all real-time event handlers.

In development, Vite runs in **middleware mode** — it intercepts requests, transforms modules on the fly, and enables hot module replacement without a separate dev server process. In production, static assets are served from the pre-built `client/` directory with gzip compression.

For every HTTP request that isn't an API call, the server performs **Server-Side Rendering (SSR)**: it calls `render()` from `src/entry-server.tsx`, gets the rendered HTML string, injects it into the `index.html` template, and sends the complete page to the browser. The browser then **hydrates** the React tree from `src/index.tsx`, making the page interactive without a full re-render.

---

### 2. Client Startup & Connection (`src/index.tsx` → `src/socket.ts`)

On the client, the React tree is wrapped in `ChatProvider`, which holds all shared state: the current connection details, the list of messages, and the list of users in the room. On mount, `ChatProvider` calls `socket.connect()`, which establishes a WebSocket connection to the server.

The socket instance (`src/socket.ts`) is created once with `autoConnect: false` — connection only happens when explicitly triggered, not on import. This is intentional: the socket should connect only after the React tree is ready, not during SSR on the server.

---

### 3. Join Flow (`JoinChatRoomForm` → `enterRoom`)

`App.tsx` checks a single boolean — `connection.connected` — to decide what to render:

- **`false`** → renders `<JoinChatRoomForm />`, a form where the user enters a display name and a room name.
- **`true`** → renders `<Chat />`, the full chat interface.

When the form is submitted, `enterRoom(name, room)` is called from `ChatProvider`. This:

1. Clears the current messages and user list (to reset from any previous room).
2. Emits an `enterRoom` event to the server with `{ name, room }`.
3. Sets `connection.connected = true` locally, which immediately switches the UI to the chat view.

On the server side, `init-socket.io.ts` handles the `enterRoom` event:

- If the socket was already in a previous room, it leaves that room and the server broadcasts a "left the room" admin message to remaining users.
- The user is registered in the in-memory `UsersState` array via `activateUser()`.
- The socket joins the new Socket.io room.
- The server emits a welcome message directly to the joining user, and a "joined the room" notification to everyone else in the room.
- Two broadcast updates are sent: `userList` to all users in the new room, and `roomList` to **every connected client** — so the sidebar showing active rooms stays in sync globally.

---

### 4. Messaging Flow (`SendMessageForm` → `message` event)

Once inside a room, the user sees a three-column layout:

- **Left column**: list of all currently active rooms (`RoomsList`).
- **Center column**: scrollable message feed (`MessagesList`) and the message input form (`SendMessageForm`).
- **Right column**: list of users currently in the room (`UserList`).

When a message is submitted, `sendMessage(name, text)` emits a `message` event to the server. The server resolves which room the sender belongs to using their `socket.id`, then re-emits the message to **every client in that room** — including the sender — via `io.to(room).emit('message', ...)`. The `buildMsg()` helper stamps each message with a formatted timestamp using `Intl.DateTimeFormat`.

On the client, `ChatProvider` listens for incoming `message` events and appends each new message to the `messages` array, triggering a re-render of `MessagesList`.

---

### 5. Presence & Typing Activity

Two additional real-time signals keep the UI lively:

- **`userList`**: whenever someone joins or leaves a room, the server pushes an updated list of users to all clients in that room. `ChatProvider` listens for this and updates the `userList` state, which `UserList` renders.
- **`roomList`**: whenever the global set of occupied rooms changes (someone joins a new room or everyone leaves a room), the server broadcasts the updated room list to all connected clients.
- **`activity`**: when a user types in the message input, the client emits an `activity` event with the user's name. The server broadcasts it to everyone else in the room (not back to the sender). The receiving clients display a "typing..." indicator.

---

### 6. Disconnect Flow

When a user disconnects — whether by closing the tab, navigating away, or clicking a logout button — Socket.io fires the `disconnect` event on the server. The server removes the user from `UsersState`, broadcasts a "left the room" message to the remaining users, and pushes updated `userList` and `roomList` events to keep everyone in sync.

---

## State Management Architecture

There is no external state management library (no Redux, Zustand, etc.). All shared client state lives in `ChatContext`:

- `connection` — current user name, room, and connected flag
- `messages` — ordered array of all messages received since joining the room
- `userList` — current users in the active room

Actions (`enterRoom`, `sendMessage`, `handleDisconnect`) are thin wrappers that emit Socket.io events and update local state. The server is the source of truth for room membership and message delivery; the client only reflects what it receives via events.

---

## Notable Design Decisions

- **No database**: all state is held in a plain JavaScript object (`UsersState`) in the server process. Restarting the server wipes all rooms, users, and message history.
- **SSR with Vite**: the app renders initial HTML on the server for faster first paint, then hydrates on the client for interactivity — a pattern uncommon for simple chat apps and suggests this was built with production performance in mind.
- **Single port**: HTTP and WebSocket traffic share the same port via `http.Server`, simplifying deployment (only one service to expose on Render).
- **Rooms are dynamic**: there is no predefined list of rooms. Any room name typed into the join form becomes a real room the moment the first user enters it, and disappears when the last user leaves.
