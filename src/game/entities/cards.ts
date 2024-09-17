export interface Card {
    value: number;
    naipe: string;
}

function shuffleArray(array: Card[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export class DeckCard {
    constructor(
        public cards: Card[] = []
    ) {
        this.init()
    }

    shuffle(){
        this.cards = shuffleArray(this.cards)
    }

    init() {
        for (let i = 0; i < 13; i++) {
            const hearts: Card = { naipe: "Hearts", value: i }     //copas
            const spades: Card = { naipe: "Spades", value: i }     //espadas
            const diamonds: Card = { naipe: "Diamonds", value: i } //ouros
            const clubs: Card = { naipe: "Clubs", value: i }       //paus
            this.cards.push(hearts, spades, diamonds, clubs)
        }
    }
}
