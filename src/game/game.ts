import { DeckCard } from "./entities/cards";
import { Dealer } from "./entities/dealer";
import { Player } from "./entities/player";
import { Table } from "./entities/table";

// Criando uma mesa
const table = new Table({
    minBet: 0
})

export function insertPlayerInTable({ id, name }: { id: string, name: string }) {
    // Criando um player
    const player = new Player({
        id,
        name,
        state: {
            sitting: true
        }
    })
    
    // Sentando o player na mesa
    return table.sitPlayer(player)
}


// Criando um baralho
const cards = new DeckCard()

// Contratando um dealer para a mesa (aqui precisamos dar um baralho para ele trabalhar)
const dealer = new Dealer(cards, table)

// Sortear flop
dealer.sortCardsFlop()

// Distribuir cartas para os players sentados na mesa
dealer.distributeCardsToPlayers()
