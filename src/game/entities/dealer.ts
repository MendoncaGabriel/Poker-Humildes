import { Card, Naipe } from "./cheap";
import { Table } from "./table";

export class Dealer {
    private deck: Card[] = []; 

    constructor(private table: Table) {
        this.initializeDeck();
        this.shuffleDeck();
    }

    // Inicializa o baralho com todas as combinações de naipes e números
    private initializeDeck(): void {
        this.deck = [];
        const suits = Object.values(Naipe); // Pegando os naipes
        const numbers = Object.values(Number); // Pegando os números (2 a Ás)

        suits.forEach(suit => {
            numbers.forEach(number => {
                this.deck.push({ naipe: suit, numero: number });
            });
        });
    }

    // Embaralha o baralho de cartas
    private shuffleDeck(): void {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    // Distribui duas cartas para cada jogador na mesa
    dealToPlayers(): void {
        this.table.getPlayers().forEach(player => {
            const card1 = this.deck.pop(); // Retira a primeira carta do topo do baralho
            const card2 = this.deck.pop();
            if (card1 && card2) {
                player.addCardsToHand({ card1, card2 });
            }
        });
    }

    // Coloca as cartas comunitárias na mesa (Flop, Turn e River)
    dealCommunityCards(): void {
        const flopCards = [this.deck.pop(), this.deck.pop(), this.deck.pop()];
        if (flopCards.every(card => card)) {
            this.table.setFlop({ card1: flopCards[0]!, card2: flopCards[1]!, card3: flopCards[2]! });
        }

        const turnCard = this.deck.pop();
        if (turnCard) {
            this.table.setTurn({ card: turnCard });
        }

        const riverCard = this.deck.pop();
        if (riverCard) {
            this.table.setRiver({ card: riverCard });
        }
    }

    // Reinicializa o baralho e reembaralha
    resetDeck(): void {
        this.initializeDeck();
        this.shuffleDeck();
    }
}
