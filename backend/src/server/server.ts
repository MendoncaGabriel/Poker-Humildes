import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { SocketManager } from './http/websocket/socketManager';
import { GameplayManager } from '../game/gameplayManager';

const app: Application = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.static(path.resolve(__dirname, '../../../frontend/dist')));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../../frontend/dist', 'index.html'));
});

const server = http.createServer(app);
const io = new SocketIOServer(server);
const socketManager = new SocketManager(io);

io.on('connection', (socket: Socket) => {
  const gameplayManager = new GameplayManager(socketManager, socket);
  socketManager.handleConnection(socket);

  socket.on('message', (message: any) => gameplayManager.execute(message));
  socket.on('disconnect', () => gameplayManager.execute({ msg: "verificar players na mesa" }));

  console.log("👤 Novo usuário conectado");
});

server.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
