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
    if(message.msg == "novo jogador conectado"){
      /*
        leva um tempo para o jogador sentar a mesa
        e preciso aguardar um tempo antes de começar
      */
      let delayToStart = 1000
      setTimeout(() => {
        handleStartGame()
      }, delayToStart);
    }

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

function handleStartGame(){
  

  /*
    verificar status da mesa, 
    a mesa so troca o stado para "running" quando estiver com o estado "waitingForPlayers",
    a mesa so troca para "running" quando tiver pelo menos dois players
  */
    
  if(table.state == "waitingForPlayers" && table.chairs.length >= 2){
    table.setState("running")
    console.log(">>> Estado da mesa mudou para: ", table.state)
  }
  

}

function sitPlayer({ data, ws, broadcast }: { data: any, ws: WebSocket, broadcast: any }) {
  data.state = {
    sitting: true
  };

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
