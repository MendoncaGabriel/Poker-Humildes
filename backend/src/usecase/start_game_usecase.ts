import { eventEmitter } from "../event_bus/eventEmitter";
import { Table } from "../game/entities/table";

export class StartGameUseCase {
    constructor() {
        eventEmitter.on('verificar se a mesa pode começar', this.handle.bind(this));
    }

    handle(table: Table) {
        console.log(table.getState())
        // Verifica se a mesa tem mais de um jogador e se está pronta para iniciar
        if (table.chairs.length > 1 && table.getState() === "waitingForPlayers") {
            console.log('🎮 Iniciando jogo');
            table.setState("preflop");
        } else {
            console.log('🚫 A mesa não pode começar.');
        }
    }
}
