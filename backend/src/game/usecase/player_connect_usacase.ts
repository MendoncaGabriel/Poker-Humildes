import { Socket } from "socket.io";
import { Player } from "../entities/player";
import { eventEmitter } from "../event_bus/eventEmitter";
import { tables } from "../entities/table";
import { socketManager } from "../../server/server";

export interface SitPlaterInTableInput {
    player: Player;
    table: {
        id: string;
    };
    socket: Socket;
}

export class PlayerConnectUseCase {
    constructor() {
        eventEmitter.on("conectar player a mesa", this.handle.bind(this));
    }

    handle(data: SitPlaterInTableInput) {
        const table = tables.find(table => table.id === data.table.id);

        if (table && table.getState() === "waitingForPlayers") {
            const player = new Player(data.player);
            table.sitPlayer(player);

            // Adiciona o usuário à mesa usando o SocketManager
            socketManager.addUserToTable(data.socket, player.id, table.id);

            eventEmitter.emit("exibir players da mesa", table);

            setTimeout(() => {
                eventEmitter.emit("verificar se a mesa pode começar", table);
            }, 5000);
        } else {
            data.socket.emit("a mesa está fechada, aguarde a próxima rodada");
            console.log(`🙋🚫 Player tentou entrar na mesa, ID: ${data.player.id}, Nome: ${data.player.name}`);
        }
    }
}
