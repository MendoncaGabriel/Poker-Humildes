import { Player } from "./entities/player";
import { Table } from "./entities/table";
import { Dealer } from "./entities/dealer";

// Criando o baralho e a mesa
const table = new Table(1);
const dealer = new Dealer(table);

export function EnterRomm({name, tableId}: {name: string, tableId: string}){
    const player = new Player({name, playerId: Number(tableId)});
    table.addPlayer(player);

    dealer.resetDeck()
    dealer.dealCommunityCards()
    dealer.dealToPlayers()

    return {
        msg1: `Novo player "${name}" entrou a sala`,
        msg2: `Jogador ${name} foi adicionado a mesa`,
        // player,
        mesa: table
    }
}

