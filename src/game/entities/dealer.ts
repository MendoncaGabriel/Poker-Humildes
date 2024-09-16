import { Table } from "./table";
import { Cheap } from "./cheap";

export class Dealer {
    private cheap: Cheap; // Referência ao baralho

    constructor(private table: Table) {
        this.cheap = new Cheap();  // Inicializa o baralho (Cheap)
    }

    // Método para distribuir cartas para os jogadores
    dealToPlayers(): void {
        this.table.getPlayers().forEach(player => {
            const card1 = this.cheap.dealCard();  // Pede uma carta ao baralho
            const card2 = this.cheap.dealCard();
            if (card1 && card2) {
                player.receiveCards([card1, card2]);  // O Dealer distribui as cartas
            }
        });
    }

    // Método para distribuir as cartas comunitárias na mesa
    dealCommunityCards(): void {
        const flopCards = [this.cheap.dealCard(), this.cheap.dealCard(), this.cheap.dealCard()];
        if (flopCards.every(card => card)) {
            this.table.setFlop({ card1: flopCards[0]!, card2: flopCards[1]!, card3: flopCards[2]! });
        }

        const turnCard = this.cheap.dealCard();
        if (turnCard) {
            this.table.setTurn({ card: turnCard });
        }

        const riverCard = this.cheap.dealCard();
        if (riverCard) {
            this.table.setRiver({ card: riverCard });
        }
    }

    // Reinicializa o baralho através do Cheap
    resetDeck(): void {
        this.cheap = new Cheap();  // Cria um novo baralho
    }
}