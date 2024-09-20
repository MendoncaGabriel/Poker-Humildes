import { Socket } from 'socket.io';
import { SocketManager } from '../server/http/websocket/socketManager';
import { game, Room } from './game';
import { Player } from './entities/player';
import { Table } from './entities/table';

export class GameplayManager {
  public playerConnections: Map<Socket, string>;

  constructor(
    private socketManager: SocketManager,
    private socket: Socket,
  ) {
    this.playerConnections = new Map<Socket, string>();
  }

  public async execute(message: any): Promise<void> {
    switch (message.msg) {
      case 'sentar player na mesa':
        if (!message.data) {
          return this.socketManager.sendToAll({ msg: '⚠️ Dados ausentes' });
        }

        try {
          await this.sitPlayer(message.data);
          await this.checkStart();
        } catch (error) {
          console.error('❌ Erro ao executar comando:', error);
          this.socketManager.sendToAll({ msg: '⚠️ Erro ao processar comando' });
        }
        break;

      case 'remover player':
        this.removePlayer();
        break;

      case 'verificar players na mesa':
        await this.checkPlayersInTable();
        break;

      default:
        console.log('❓ Mensagem desconhecida:', message.msg);
        break;
    }
  }

  private async getTableByRoomId(roomId: string): Promise<Table> {
    const room = await game.getRoomById(roomId);
    if (!room) throw new Error(`🚫 Sala com ID ${roomId} não encontrada.`);
    return room.table;
  }

  private async checkPlayersInTable(): Promise<void> {
    const table = await this.getTableByRoomId('sala-1');

    if (table.chairs.length === 0) {
      console.log("🪑 Mesa vazia.");
    }

    if (table.chairs.length < 2) {
      console.log("🪑 Aguardando jogadores");
    }

    const playerId = this.playerConnections.get(this.socket);
    if (playerId) {
      console.log(`👤 Removendo jogador ${playerId} da mesa.`);
      table.kickPlayer(playerId);
      this.playerConnections.delete(this.socket);
    }

    this.socketManager.sendToAll({
      msg: "exibir players da mesa",
      chairs: table.chairs
    });
  }

  private async checkStart(): Promise<void> {
    const table = await this.getTableByRoomId('sala-1');

    if (table.state === "waitingForPlayers" && table.chairs.length >= 2) {
      console.log("⏳ Começando jogo em 3s...");
      setTimeout(() => {
        table.lookTabe();
        console.log("🔒 Trancando a mesa...");
        table.setState('running');
        this.handleStartPlay(table);
      }, 3000);
    } else if (table.chairs.length < 2) {
      console.log("🔓 Destrancando a mesa...");
      console.log("🪑 Aguardando jogadores");
      table.unLookTabe();
      table.setState("waitingForPlayers");
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

  private async sitPlayer(data: any): Promise<void> {
    const { player, room } = data;
    const table = await this.getTableByRoomId(room.id);
    const newPlayer = new Player({ id: player.id, name: player.name });
    newPlayer.state = { sitting: true };

    // Verificar se o jogador já está na mesa
    const existingPlayer = table.chairs.find(chair => chair.id === player.id);
    if (existingPlayer) {
      console.log(`👤 Jogador ${player.id} já está na mesa.`);
      return; // Jogador já está na mesa, nada a fazer
    }

    this.playerConnections.set(this.socket, player.id);

    try {
      table.sitPlayer(newPlayer);
      this.socketManager.sendToAll({
        msg: "exibir players da mesa",
        chairs: table.chairs
      });
    } catch (error) {
      console.error('❌ Erro ao sentar jogador:', error);
      this.socketManager.sendToAll({ msg: '⚠️ Erro ao sentar jogador' });
    }
  }

  private removePlayer(): void {
    const playerId = this.playerConnections.get(this.socket);
    let room;

    if (playerId) {
      room = game.rooms.find(r => r.table.chairs.some(chair => chair.id === playerId));
      if (room) {
        room.table.kickPlayer(playerId);
        this.playerConnections.delete(this.socket);
      }
    }

    this.socketManager.sendToAll({
      msg: "exibir players da mesa",
      chairs: room?.table.chairs || []
    });
  }
}
