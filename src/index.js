"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = require("cors");
var express_2 = require("express");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static(__dirname + "/public"));
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    io.to(socket.id).emit("Message:", "You are connected");
    socket.on("message", function (data) {
        socket.broadcast.emit("message", data);
    });
});
var route = (0, express_2.Router)();
app.use(express_1.default.json());
route.get('/', function (req, res) {
    res.render("/index.html");
});
app.use(route);
var port = process.env.PORT || 3333;
server.listen(port, function () { return 'server running on port 3333'; });
