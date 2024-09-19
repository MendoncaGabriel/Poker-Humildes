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
app.set('views', path.resolve('src', 'ui', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../ui/public')));


// Rotas
app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

const server: HTTPServer = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server);
const socketManager = new SocketManager(io);

io.on('connection', (socket: Socket) => {
  const gameplayManager = new GameplayManager(socketManager, socket);
  socketManager.handleConnection(socket);
  console.log(">>> 🖥️  Socket: Novo usuario conectado")

    
  socket.on('message', (message: any) => {
    gameplayManager.execute(message);
  });

  socket.on('disconnect', () => {
    gameplayManager.execute({msg: "verificar players na mesa"})
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
