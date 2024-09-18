import { DeckCard } from "./entities/cards";
import { Dealer } from "./entities/dealer";
import { Table } from "./entities/table";

// Criando uma mesa
export const table = new Table({
    minBet: 0
})

// Criando um baralho para o dealer
const cards = new DeckCard()

// Criar um dealer para a mesa e da a ela um baralho
const dealer = new Dealer(cards, table)

// Sortear flop
dealer.sortCardsFlop()

// Distribuir cartas para os players sentados na mesa
dealer.distributeCardsToPlayers()
