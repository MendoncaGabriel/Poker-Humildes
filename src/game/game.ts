import { Table } from "./entities/table";
import { PlayerManager } from "./entities/PlayerManager";
import { CommunityCardsManager } from "./entities/CommunityCardsManager";
import { Player } from "./entities/player";
import { GameRound } from "./entities/GameRound";

function startGame(table: Table, playerManager: PlayerManager, communityCardsManager: CommunityCardsManager): void {
    const round = new GameRound(playerManager, communityCardsManager);
    round.start();
}

let tables = []

export function bootTables(){
    let table = new Table("mesa-001");
    tables.push(table)
    console.log("Iniciando mesas....")

    const communityCardsManager = new CommunityCardsManager();
    const playerManager = new PlayerManager(() => startGame(table, playerManager, communityCardsManager));
    console.log("Ativando Player manager....")
}

export function addPlayer() {
    const player = new Player({
        name: "Gabriel",
        playerId: 123
    });
    playerManager.addPlayer(player);

}






