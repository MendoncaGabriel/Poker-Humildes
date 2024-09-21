import { eventEmitter } from "../event_bus/eventEmitter";
import { Table } from "../game/entities/table";
import { socketManager } from "../server/server";

export class ShowPlayerInTableUseCase {
    constructor(){
        eventEmitter.on("exibir players da mesa", this.handle.bind(this))
    }

    handle(table: Table){
        const chairs = table.chairs
        socketManager.sendToTable(table.id, { 
            msg: "exibir players da mesa", 
            chairs
        })
    }
}