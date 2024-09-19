import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { WebSocketServer } from 'ws';
import { table } from '../game/game';
import { SocketMaganer, playerConnections } from '../game/socketMaganer';

const app = express();
const port = 3000;

// Configurações
app.use(cors());
app.set('views', path.resolve('src', 'ui', 'views'));
app.set('view engine', 'ejs');
// Configurar pasta estática
app.use(express.static(path.join(__dirname, '../ui/public')));

// Rotas
app.get('/', (req: Request, res: Response) => {
  res.render('index');
});


// WebSocket
const server = app.listen(port, () => {
  console.log(`Servidor HTTP rodando em http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {

  const socketMaganer = new SocketMaganer({ ws, wss });
  socketMaganer.send({
    msg: "novo jogador conectado"
  })

  ws.on('message', async (data) => {
    const message = JSON.parse(data.toString());
    socketMaganer.send(message)
  });

  ws.on('close', () => {
    socketMaganer.send({
      msg: "remover player",
    })
  });

  ws.on('error', (error) => {
    console.error('>>> Erro no WebSocket: ', error);
  });

});
