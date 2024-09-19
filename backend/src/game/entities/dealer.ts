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

    sortCardstable(){    
        // selecionar as cartas da mesa
        const flop1 = this.deckCard.cards[0]
        const flop2 = this.deckCard.cards[1]
        const flop3 = this.deckCard.cards[2]
        const turn =  this.deckCard.cards[3]
        const river = this.deckCard.cards[4]

        //remove do deck as cartas selecionadas
        this.deckCard.removeFirst()
        this.deckCard.removeFirst()
        this.deckCard.removeFirst()
        this.deckCard.removeFirst()
        this.deckCard.removeFirst()
        
        //seta as cartas da mesa
        this.table.setCardTable({
            flop: [flop1, flop2, flop3],
            turn: turn,
            river: river
        })

        console.log(`>>> 🃏 dealer: distribuiu as cartas da mesa`)
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