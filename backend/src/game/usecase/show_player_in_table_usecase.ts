import { eventEmitter } from "../event_bus/eventEmitter";
import { Table } from "../entities/table";
import { socketManager } from "../../server/server";

export class ShowPlayerInTableUseCase {
    constructor(){
        eventEmitter.on("exibir players da mesa", this.handle.bind(this))
    }

    handle(table: Table){

        socketManager.sendToTable(table.id, { 
            msg: "exibir players da mesa", 
            chairs: table.chairs
        })
    }
}