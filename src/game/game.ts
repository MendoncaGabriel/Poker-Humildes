import { Player } from "./entities/player";
import { Table } from "./entities/table";
import { Dealer } from "./entities/dealer";
import { PokerGame } from "./events/pokerStage";
import { ObservableArray } from "./utils/observableArray";

// Criando o baralho e a mesa
const table = new Table(1);
const dealer = new Dealer(table);
// Exemplo de uso
const pokerGame = new PokerGame();


setInterval((

)=>{
    pokerGame.next()

}, 5000)



export function EnterRomm({name, tableId}: {name: string, tableId: string}){
    const player = new Player({name, playerId: Number(tableId)});
    //TODO: verificar se o usuario ja esta na mesa por meio do id, se não criar um novo usuario e inserir ele na mesa

    table.addPlayer(player, () => {
        //TODO: verificar se a lugar a mesa
        //TODO: verificar se tem mais de um jogador
        //TODO: agurdar jogadores //20s
        console.log(table.getPlayers())
    });

    //ag
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

