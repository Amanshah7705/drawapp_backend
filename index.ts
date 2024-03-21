import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import { colorAndSize, coordinates } from "./returnType";
const app = express();
app.use(cors());
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "https://drawer-frontend.vercel.app/",
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("beginPath", (Coordinates: coordinates) => {
    socket.broadcast.emit("beginPath", Coordinates);
  });
  socket.on("drawPath", (Coordinates: coordinates) => {
    socket.broadcast.emit("drawPath", Coordinates);
  });
  socket.on("changeConfig", (colorAndSize: colorAndSize) => {
    socket.broadcast.emit("changeConfig", colorAndSize);
  });
});

httpServer.listen(5000);
