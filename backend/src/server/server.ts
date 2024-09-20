import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { eventEmitter } from '../event_bus/eventEmitter';

const app: Application = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.static(path.resolve(__dirname, '../../../frontend/dist')));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../../frontend/dist', 'index.html'));
});

const server = http.createServer(app);
const io = new SocketIOServer(server);

io.on('connection', (socket: Socket) => {
  console.log("👤 Novo usuário conectado");

  socket.on('message', (event: any) => {
    const {player, room} = event.data
    eventEmitter.emit(event.msg, { player, room, socket });
  });  

  socket.on('disconnect', () => {
    eventEmitter.emit('playerDisconnected', { socketId: socket.id });
  });
});


server.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
