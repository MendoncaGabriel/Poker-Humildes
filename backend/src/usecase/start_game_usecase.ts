import { eventEmitter } from "../event_bus/eventEmitter";
import { Table } from "../game/entities/table";

export class StartGameUseCase {
    constructor() {
        eventEmitter.on('verificar se a mesa pode comecar', this.handle.bind(this));
    }

    handle(table: Table) {
        if (table.chairs.length > 1 && table.getState() == "waitingForPlayers") {
            console.log('🎮 Iniciando jogo');
            table.setState("preflop")
        }
    }
}
