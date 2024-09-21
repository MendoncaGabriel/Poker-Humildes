import { eventEmitter } from "../event_bus/eventEmitter";
import { Table } from "../game/entities/table";

export class PreFlopUseCase {
    constructor(){
        eventEmitter.on("iniciar rodada pre flop", this.handle.bind(this))
    }

    handle(table: Table){
        console.log(`🃏 Iniciando pre flop`)
        table.shuffleCards()
        table.sortCardTable()
        table.distributeCardsToPlayers()

        table.assignBlinds()
        table.selectTurnPlayer();

    }
}