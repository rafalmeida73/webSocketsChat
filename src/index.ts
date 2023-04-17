import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from 'cors';

import { Router, Request, Response } from 'express';

const app = express();
app.use(cors())

app.use(express.static(__dirname + "/public"));
const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  io.to(socket.id).emit("Message:", "You are connected");

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  })
})

const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
  res.render("index.html")
})

app.use(route)
const port = process.env.PORT || 3333

server.listen(port, () => 'server running on port 3333')
