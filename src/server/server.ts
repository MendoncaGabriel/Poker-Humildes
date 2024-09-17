import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { WebSocketServer } from 'ws';
import { insertPlayerInTable } from '../game/game';

const app = express();
const port = 3000;

// Configurações
app.use(cors());
app.set('views', path.resolve('src', 'ui', 'views'));
app.set('view engine', 'ejs');

// WebSocket
const server = app.listen(port, () => {
  console.log(`Servidor HTTP rodando em http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Novo cliente conectado ao WebSocket.');

  ws.on('message', async (data) => {
    const message = JSON.parse(data.toString())
    console.log(message);


    // Envia a mensagem de volta para o cliente
    ws.send(`Recebi sua mensagem!`);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado do WebSocket.');
  });

  ws.on('error', (error) => {
    console.error('Erro no WebSocket: ', error);
  });
});

console.log('WebSocket Server inicializado.');

// Rotas
app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

