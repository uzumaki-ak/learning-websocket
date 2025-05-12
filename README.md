just practised how chat app would work Chat App (Socket.IO + React + Express)

A simple real-time chat application built with **Vite + React**, **Node.js**, **Express**, **Socket.IO**, and **Material UI**. Users can join specific rooms and exchange messages in real time using Socket.IO's `emit`, `broadcast`, `join`, and `to` `on` functionalities.

## 🚀 Features

- Join chat rooms
- Real-time messaging using WebSockets
- Broadcast messages to all users in a room
-UI using Material UI


## 🛠️ Tech Stack

- **Frontend**: React (with Vite), Socket.IO Client, Material UI
- **Backend**: Node.js, Express, Socket.IO
- **Others**: CORS enabled for cross-origin socket communication





- A user joins a room by emitting a `join-room` event.
- The server adds them to that Socket.IO room.
- Messages are sent using the `message` event, with the target room as payload.
- Server emits the message only to clients in that room using `io.to(room).emit(...)`.

## 📦 Scripts

| Command          | Description                |
|------------------|----------------------------|
| `npm run dev`    | Starts Vite frontend       |
| `npm run dev` | Runs backend with Express  |

## 🧠 Concepts Used

- `socket.emit()` – Send data to the server
- `socket.on()` – Listen for events from the server
- `socket.join(room)` – Join specific chat rooms
- `io.to(room).emit()` – Send message to a room
- `socket.broadcast.emit()` – Send to all except sender
