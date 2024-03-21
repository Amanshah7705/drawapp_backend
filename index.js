"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "https://drawer-frontend.vercel.app/",
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    socket.on("beginPath", (Coordinates) => {
        socket.broadcast.emit("beginPath", Coordinates);
    });
    socket.on("drawPath", (Coordinates) => {
        socket.broadcast.emit("drawPath", Coordinates);
    });
    socket.on("changeConfig", (colorAndSize) => {
        socket.broadcast.emit("changeConfig", colorAndSize);
    });
});
httpServer.listen(5000);
