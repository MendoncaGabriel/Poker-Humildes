import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import http, { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { SocketManager } from './http/websocket/socketIo';

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

io.on('connection', (socket: Socket) => {
  console.log('Novo jogador conectado');

  const socketManager = new SocketManager(io, socket);
  socketManager.sendToClient({ msg: "Bem-vindo ao jogo!" });
  socketManager.sendToAll({ msg: "Novo jogador conectado" });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
