import WebSocket from 'ws';
import { table } from "./game";
import { handleEventGameplay } from './entities/gameplay';

export const playerConnections = new Map();

export class SocketMaganer {
  private ws: WebSocket;
  private wss: WebSocket.Server;

  constructor(
    { ws, wss }: { ws: WebSocket, wss: WebSocket.Server }
  ) {
    this.ws = ws;
    this.wss = wss;
  }

  broadcast = (message: any) => {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(typeof message !== "string" ? JSON.stringify(message) : message);
      }
    });
  }

  send(message: any): void {
    handleNotify({
      event: message.msg,
      broadcast: this.broadcast,
      data: message.data,
      ws: this.ws
    })
  }
}

type HandleNotify = "sentar player na mesa" | "remover player" | "novo jogador conectado" | "bet";
function handleNotify({ event, broadcast, data, ws }: { event: HandleNotify, data: any, ws: WebSocket, broadcast: any }) {

  switch (event) {
    case "bet":
      console.log(event)
      break;
    case "novo jogador conectado":
      console.log(">>> novo jogador conectado!")

      let delayToStart: number = 3000

      setTimeout(() => {
        handleEventGameplay({
          event: "start game",
          broadcast
        })
      }, delayToStart);

      break;
    case "sentar player na mesa":
      // esta função notifica os jogadores conectados para renderizar os jogadores da mesa na tela
      
      data.state = { sitting: true };
      playerConnections.set(ws, data.id);

      try {
        table.sitPlayer(data);

        const updateMessage = {
          msg: "exibir players da mesa",
          chairs: table.chairs
        };
        broadcast(updateMessage);
      } catch (error) {
        if (error instanceof Error) {
          broadcast({
            msg: error.message
          });
        } else {
          broadcast("Ocorreu um erro desconhecido");
        }
      }
      break;
    case "remover player":
      const playerId = playerConnections.get(ws);

      if (playerId) {
        table.kickPlayer(playerId);
        playerConnections.delete(ws);
      }

      const updateMessage = {
        msg: "exibir players da mesa",
        chairs: table.chairs
      };

      broadcast(updateMessage);
      break;
    
      default:
      console.log(">>> gameplay: notificação desconhecida.", event);
      break;
  }
}



