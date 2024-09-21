import { Socket } from "socket.io"
import { conectionsUser, playerTableMap } from "../game/events/connections"
import { Player } from "../game/entities/player"
import { eventEmitter } from "../event_bus/eventEmitter"
import { tables } from "../game/entities/table"
import { socketManager } from "../server/server"

export interface SitPlaterInTableInput {
    player: Player
    table: {
        id: string
    },
    socket: Socket
}

export class PlayerConnectUseCase {
    constructor(){
        eventEmitter.on("conectar player a mesa", this.handle.bind(this))
    }

    handle(data: SitPlaterInTableInput){
        
        const table = tables.find(table => table.id == data.table.id)
        
        
        if (table && table.getState() == "waitingForPlayers") {
            const player = new Player(data.player)
            table.sitPlayer(player);
            
            socketManager.addToTable(data.socket, table.id);
            playerTableMap.set(player.id, data.table.id);   
            conectionsUser.set(data.socket, player.id)
            eventEmitter.emit("exibir players da mesa", table);

            setTimeout(() => {
                eventEmitter.emit("verificar se a mesa pode comecar", table);
            }, 5000);
        } else {
            data.socket.emit("a mesa está fechada, aguarde a próxima rodada");
            console.log(`🙋🚫 player tentou entrar na mesa, id: ${data.player.id}, name: ${data.player.name}`)
        }
    }
}
