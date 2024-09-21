import { eventEmitter } from "../event_bus/eventEmitter";
import { Player } from "../game/entities/player";
import { Table } from "../game/entities/table";
import { socketManager } from "../server/server";

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
        table.selectTurnPlayer(function (player: Player) {
            socketManager.sendToUser(player.id, { msg: "Sua vez" });
            console.log(`✅ Jogador selecionado pelo callback: ${player.name} (ID: ${player.id})`);
        });
        
    }
}