"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const express_2 = require("express");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.engine('html', require('ejs').renderFile);
app.use(express_1.default.static(__dirname + "/public"));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    io.to(socket.id).emit("Message:", "You are connected");
    socket.on("message", (data) => {
        socket.broadcast.emit("message", data);
    });
});
const route = (0, express_2.Router)();
app.use(express_1.default.json());
route.get('/', (req, res) => {
    res.render("index.html");
});
app.use(route);
const port = process.env.PORT || 3333;
server.listen(port, () => 'server running on port 3333');
