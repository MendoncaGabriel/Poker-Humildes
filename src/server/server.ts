import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { WebSocketServer } from 'ws';
import { table } from '../game/game';

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

// Mapeamento de WebSocket para jogador
const playerConnections = new Map();

// WebSocket
const server = app.listen(port, () => {
  console.log(`Servidor HTTP rodando em http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  
  ws.on('message', async (data) => {
    const message = JSON.parse(data.toString());
    console.log(`>>> Novo jogador ${message.data.name} conectado!`);

    if (message.msg === "sentar player na mesa") {
      message.data.state = {
        sitting: true
      };

      // Armazenar a conexão e o ID do jogador
      playerConnections.set(ws, message.data.id);

      table.sitPlayer(message.data);

      // Enviar a atualização para todos os jogadores conectados
      const updateMessage = JSON.stringify({
        msg: "exibir players da mesa",
        chairs: table.chairs
      });

      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(updateMessage);
        }
      });
    } else {
      // Enviar a mensagem para todos os jogadores conectados
      const broadcastMessage = JSON.stringify({
        msg: "mensagem do jogador",
        data: message
      });

      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(broadcastMessage);
        }
      });
    }
  });

  ws.on('close', () => {
    // Encontrar e remover o jogador associado
    const playerId = playerConnections.get(ws);
    if (playerId) {
      table.kickPlayer(playerId);
      playerConnections.delete(ws);
      console.log(`>>> Jogador ${playerId} removido da mesa.`);
    }

    // Enviar a atualização para todos os jogadores conectados
    const updateMessage = JSON.stringify({
      msg: "exibir players da mesa",
      chairs: table.chairs
    });

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(updateMessage);
      }
    });
  });

  ws.on('error', (error) => {
    console.error('>>> Erro no WebSocket: ', error);
  });
});
