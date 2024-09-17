import { DeckCard } from "./cards";
import { Table } from "./table";

export class Dealer {
    constructor(
        private readonly deckCard: DeckCard,
        private table: Table
    ){
        this.shuffleCards()
    }

    shuffleCards(){
        this.deckCard.shuffle()
    }

    sortCardsFlop(){      
        const card1 = this.deckCard.cards[0]
        const card2 = this.deckCard.cards[1]
        const card3 = this.deckCard.cards[3]
        this.deckCard.removeFirst()
        this.deckCard.removeFirst()
        this.deckCard.removeFirst()
        this.table.setFlop([card1, card2, card3])
    } 
    
    sortCardTurn(){
        const card1 = this.deckCard.cards[0]
        this.deckCard.removeFirst()
        this.table.setTurn(card1)
    }

    sortCardRiver(){
        const card1 = this.deckCard.cards[0]
        this.deckCard.removeFirst()
        this.table.setRiver(card1)
    }

    distributeCardsToPlayers(){
        this.table.chairs.forEach(player => {
            if(player.state.sitting == true){
                const card1 = this.deckCard.cards[0]
                const card2 = this.deckCard.cards[1]
                this.deckCard.removeFirst()
                this.deckCard.removeFirst()

                player.setHand({
                    fistCard: card1,
                    secoundCard: card2
                })
            }
        })
    }
}