import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import http, { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { SocketManager } from './http/websocket/socketManager';
import { GameplayManager } from '../game/gameplayManager';

const app: Application = express();
const port = 3000;

app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Substitua pela URL de desenvolvimento do seu frontend
}));


// Serve arquivos estáticos da pasta dist do frontend
app.use(express.static(path.resolve(__dirname, '../../../frontend/dist')));

// Rota para servir o arquivo HTML principal
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../../frontend/dist', 'index.html'));
});

const server: HTTPServer = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server);
const socketManager = new SocketManager(io);

io.on('connection', (socket: Socket) => {
  const gameplayManager = new GameplayManager(socketManager, socket);
  socketManager.handleConnection(socket);
  console.log(">>> 🖥️  Socket: Novo usuario conectado");

  socket.on('message', (message: any) => {
    gameplayManager.execute(message);
  });

  socket.on('disconnect', () => {
    gameplayManager.execute({ msg: "verificar players na mesa" });
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
