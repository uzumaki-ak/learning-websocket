import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useMemo } from "react";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
    setRoom("");
  };
  const joinHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("")
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected to server", socket.id);
    });

    socket.on("received-message", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (w) => {
      console.log(w);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Container>
      <Typography variant="h3" component="div" gutterBottom>
        Hey i am learmning soct io
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        {socketId}
      </Typography>

      <form onSubmit={joinHandler}>
        <h5>join room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="JoinRoom"
          variant="outlined"
        />
         <Button type="submit">join</Button>
      </form>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit">send</Button>
      </form>
      <Stack>
        {messages.map((m, i) => (
          <Typography key={i}>{m}</Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
