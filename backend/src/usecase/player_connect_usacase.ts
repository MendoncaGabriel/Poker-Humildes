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
        playerTableMap.set(data.player.id, data.table.id);   
        conectionsUser.set(data.socket, data.player.id)

        const tableRoom = tables.find(table => table.id == data.table.id)
        if(tableRoom){

            socketManager.addToTable(data.socket, tableRoom.id);
    
            tableRoom?.sitPlayer(data.player)
            eventEmitter.emit("jogador sentou na mesa", data)
            eventEmitter.emit("iniciar jogo")
        }
    }
}
