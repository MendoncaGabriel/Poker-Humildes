import { DeckCard } from "./entities/cards";
import { Dealer } from "./entities/dealer";
import { Table } from "./entities/table";

// Criando uma mesa
export const table = new Table({
    minBet: 0
})




// Criando um baralho
const cards = new DeckCard()

// Contratando um dealer para a mesa (aqui precisamos dar um baralho para ele trabalhar)
const dealer = new Dealer(cards, table)

// Sortear flop
dealer.sortCardsFlop()

// Distribuir cartas para os players sentados na mesa
dealer.distributeCardsToPlayers()
