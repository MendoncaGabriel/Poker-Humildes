import { Socket } from "socket.io";
import { conectionsUser, playerTableMap } from "../game/events/connections";
import { eventEmitter } from "../event_bus/eventEmitter";
import { tables } from "../game/entities/table";

export class PlayerDisconnectedUsecase {
    handle({ socket }: { socket: Socket }) {
        console.log("💻 Player desconectou");

        const playerId = conectionsUser.get(socket); 

        if (playerId) {
            console.log(`Jogador encontrado: ${playerId}`);
            conectionsUser.delete(socket); 

            const tableId = playerTableMap.get(playerId); // Busca a mesa usando o mapa
            if (tableId) {
                const table = tables.find(t => t.id === tableId);
                if (table) {
                    table.kickPlayer(playerId);
                    eventEmitter.emit("exibir players da mesa", table);
                }
            }
        } else {
            console.log("Jogador não encontrado");
        }
    }
}
