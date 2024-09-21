import { eventEmitter } from "../event_bus/eventEmitter";
import { tables } from "../entities/table";
import { socketManager } from "../../server/server";

export class PlayerDisconnectedUsecase {
    constructor() {
        eventEmitter.on('player desconectou', this.handle.bind(this));
    }

    handle({ userId }: { userId: string }) { // Agora apenas recebe o userId
        console.log(`💻🤦‍♂️ Player desconectou: ${userId}`);

        const tableId = socketManager.userTables.get(userId); // Obter a mesa do usuário

        if (tableId) {
            const table = tables.find(t => t.id === tableId);
            if (table) {
                // Verificar se o jogador que desconectou tem a vez
                const player = table.chairs.find(e => e.id == userId);
                table.kickPlayer(userId);

                if (player && player.state.myTurn) {
                    console.log(`🙋 Player desconectado tinha a vez`);

                    setTimeout(() => {
                        if (table.chairs.length > 1) {
                            table.selectTurnPlayer();
                            console.log(`🏓 Passando a vez para outro player`);
                        } else {
                            table.setState("waitingForPlayers");
                            console.log(`🏓 Aguardando players`);
                        }
                    }, 2000);
                }

                eventEmitter.emit("exibir players da mesa", table);
            }
        } else {
            console.log("Jogador não encontrado na mesa.");
        }
    }
}
