export enum Naipe {
    Hearts = "Hearts",     // Copas
    Diamonds = "Diamonds", // Ouros
    Clubs = "Clubs",       // Paus
    Spades = "Spades"      // Espadas
}

export enum Number {
    Ace = "Ace",     // Ás
    Two = "2",       // 2
    Three = "3",     // 3
    Four = "4",      // 4
    Five = "5",      // 5
    Six = "6",       // 6
    Seven = "7",     // 7
    Eight = "8",     // 8
    Nine = "9",      // 9
    Ten = "10",      // 10
    Jack = "Jack",   // Valete
    Queen = "Queen", // Dama
    King = "King"    // Rei
}

export interface Card {
    naipe: Naipe;
    numero: Number;
}

export class Cheap {
    private cards: Card[] = [];

    constructor() {
        this.createDeck();
        this.shuffle();
    }

    // Método para criar o baralho com 52 cartas
    private createDeck() {
        this.cards = [];
        const suits = Object.values(Naipe);  // Obtém todos os naipes
        const numbers = Object.values(Number); // Obtém todos os números

        // Cria as combinações de naipes e números
        for (const suit of suits) {
            for (const number of numbers) {
                this.cards.push({ naipe: suit, numero: number });
            }
        }
    }

    // Método para embaralhar as cartas do baralho
    private shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // Método para distribuir uma carta
    dealCard(): Card | undefined {
        return this.cards.pop();  // Remove e retorna a última carta do baralho
    }

    // Método para exibir quantas cartas restam no baralho
    remainingCards(): number {
        return this.cards.length;
    }
}
