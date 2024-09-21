
// REFATORAR EM MODULOS SEPARADOS INDIVIDUAIS
export class GameplayManager {


  public async execute(message: any): Promise<void> {
    switch (message.msg) {
      case 'sentar player na mesa':
        if (!message.data) {
          return this.socketManager.sendToAll({ msg: '⚠️ Dados ausentes' });
        }

        try {
          // await this.sitPlayer(message.data);
          await this.handleStartGame();
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

      case 'avisar jogador que e sua vez':
        this.indicateTurnPlayer()
        break;

      default:
        console.log('❓ Mensagem desconhecida:', message.msg);
        break;
    }
  }

  private async indicateTurnPlayer() {
    this.socketManager.sendToClient(this.socket, { msg: "sua vez" })
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

  private async handleStartGame(): Promise<void> {
    const table = await this.getTableByRoomId('sala-1');

    if (table.state === "waitingForPlayers" && table.chairs.length >= 2) {
      console.log("⏳ Começando jogo em 3s...");
      setTimeout(() => {
        table.lookTabe();
        console.log("🔒 Trancando a mesa...");
        table.setState('running');

        table.dealer.shuffleCards();
        table.assignBlinds();
        table.dealer.sortCardstable();
        table.dealer.distributeCardsToPlayers();

        table.selectTurnPlayer();
        this.execute({ msg: "avisar jogador que e sua vez" })
        // this.socketManager.sendToAll("show flop");
      }, 3000);
    } else if (table.chairs.length < 2) {
      console.log("🔓 Destrancando a mesa...");
      console.log("🪑 Aguardando jogadores");
      table.unLookTabe();
      table.setState("waitingForPlayers");
    }
  }

}
