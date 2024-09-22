import { eventEmitter } from "../event_bus/eventEmitter";
import { Table } from "../entities/table";

export class HandleStateTableUseCase {
    constructor(){
        eventEmitter.on("novo estado", this.handle.bind(this))
    }

    handle(table: Table){
        const state = table.getState()
        if(state == "waitingForPlayers") eventEmitter.emit("aguardando jogadores", table)
        if(state == "preflop") eventEmitter.emit("iniciar rodada pre flop", table)

    }
}

/*
    este componente e um pivo de eventos, 
    toda vez que o estado da mesa mudar
    este pivo deverar chamar o evento correspondente ao evento
*/