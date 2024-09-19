import { DeckCard } from "./cards";
import { Player } from "./player";
import { Table } from "./table";

export class Dealer {
    constructor(
        private readonly deckCard: DeckCard,
        private table: Table
        
    ){ }

    shuffleCards(){
        console.log(`>>> 🃏 dealer: embaralhando cartas.`)

        this.deckCard.shuffle()
    }

    sortCardsFlop(){    
        console.log(`>>> 🃏 dealer: distribuiu as cartas para o flop`)
        const card1 = this.deckCard.cards[0]
        const card2 = this.deckCard.cards[1]
        const card3 = this.deckCard.cards[3]
        this.deckCard.removeFirst()
        this.deckCard.removeFirst()
        this.deckCard.removeFirst()
        this.table.setFlop([card1, card2, card3])
    } 
    
    sortCardTurn(){
        console.log(`>>> 🃏 dealer: distribuiu as cartas para o turn`)
        const card1 = this.deckCard.cards[0]
        this.deckCard.removeFirst()
        this.table.setTurn(card1)
    }

    sortCardRiver(){
        console.log(`>>> 🃏 dealer: distribuiu as cartas para o river`)
        const card1 = this.deckCard.cards[0]
        this.deckCard.removeFirst()
        this.table.setRiver(card1)
    }

    distributeCardsToPlayers() {
        console.log(`>>> 🃏 dealer: distribuiu as cartas para os players`);
        this.table.chairs.forEach(playerTable => {
            if(playerTable.state.sitting == true){
                if(this.deckCard.cards.length < 2) {
                    throw new Error("Não há cartas suficientes no deck para distribuir.");
                }
                const card1 = this.deckCard.cards[0];
                const card2 = this.deckCard.cards[1];
                this.deckCard.removeFirst();
                this.deckCard.removeFirst();
                
                const player = new Player(playerTable);
                player.setHand({
                    fistCard: card1,
                    secoundCard: card2
                });
            }
        });
    }
    
}