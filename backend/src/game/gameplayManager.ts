import { Socket } from 'socket.io';
import { SocketManager } from '../server/http/websocket/socketManager';
import { game, Room } from './game';
import { Player } from './entities/player';
import { Table } from './entities/table';

export const playerConnections = new Map<Socket, string>();

export class GameplayManager {
  constructor(
    private socketManager: SocketManager,
    private socket: Socket
  ) {}

  public execute(message: any): void {
    switch (message.msg) {
      case 'sentar player na mesa':
        if (!message.data) {
          return this.socketManager.sendToAll({ msg: '⚠️ Dados ausentes' });
        }
        this.sitPlayer(message.data);
        this.checkStart();
        break;

      case 'remover player':
        this.removePlayer();
        break;

      case 'verificar players na mesa':
        this.checkPlayersInTable();
        break;

      default:
        console.log('❓ Mensagem desconhecida:', message.msg);
        break;
    }
  }

  private getTableByRoomId(roomId: string): Table {
    const room = game.getRoomById(roomId);
    if (!room) throw new Error(`🚫 Sala com ID ${roomId} não encontrada.`);
    return room.table;
  }

  private checkPlayersInTable(): void {
    const table = this.getTableByRoomId('sala-1');

    if (table.chairs.length === 0) {
      console.log("🪑 Mesa vazia.");
    }
  }

  private checkStart(): void {
    const table = this.getTableByRoomId('sala-1');
    if (table.state === "waitingForPlayers" && table.chairs.length >= 2) {
      console.log("⏳ Começando jogo em 3s...");
      setTimeout(() => {
        table.lookTabe();
        table.setState('running');
        this.handleStartPlay(table);
      }, 3000);
    }
  }

  private handleStartPlay(table: Table): void {
    console.log(`>>> 🃏 ${table.chairs.length} jogadores estão na mesa.`);
    if (table.chairs.length >= 2) {
      table.dealer.shuffleCards();
      table.assignBlinds();
      table.dealer.sortCardstable();
      table.dealer.distributeCardsToPlayers();
      table.selectTurnPlayer();
      this.socketManager.sendToAll("show flop");
    }
  }

  private sitPlayer(data: any): void {
    const { player, room } = data;
    const table = this.getTableByRoomId(room.id);
    const newPlayer = new Player({ id: player.id, name: player.name });
    newPlayer.state = { sitting: true };
    playerConnections.set(this.socket, player.id);

    try {
      table.sitPlayer(newPlayer);
      this.socketManager.sendToAll({
        msg: "exibir players da mesa",
        chairs: table.chairs
      });
    } catch (error) {
      this.socketManager.sendToAll({ msg: error instanceof Error ? `⚠️ ${error.message}` : '⚠️ Erro desconhecido' });
    }
  }

  private removePlayer(): void {
    const playerId = playerConnections.get(this.socket);
    let room;
    
    if (playerId) {
      room = game.rooms.find(r => r.table.chairs.some(chair => chair.id === playerId));
      if (room) {
        room.table.kickPlayer(playerId);
        playerConnections.delete(this.socket);
      }
    }
    
    this.socketManager.sendToAll({
      msg: "exibir players da mesa",
      chairs: room?.table.chairs || []
    });
  }
}
