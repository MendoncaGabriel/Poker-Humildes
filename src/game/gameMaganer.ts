import WebSocket from 'ws';
import { table } from "./game";

export const playerConnections = new Map();

export class GameManager {
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
    if (message.msg === "remover player") {
      removePlayer({
        ws: this.ws,
        broadcast: this.broadcast
      });
    }

    if (message.msg === "sentar player na mesa") {
      sitPlayer({
        data: message.data,
        ws: this.ws,
        broadcast: this.broadcast
      });
    }
  }
}

function sitPlayer({ data, ws, broadcast }: { data: any, ws: WebSocket, broadcast: any }) {
  data.state = {
    sitting: true
  };

  playerConnections.set(ws, data.id);

  table.sitPlayer(data);

  const updateMessage = {
    msg: "exibir players da mesa",
    chairs: table.chairs
  };

  broadcast(updateMessage);
}

function removePlayer({ ws, broadcast }: { ws: WebSocket, broadcast: any }) {
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
}
