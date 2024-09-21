import { eventEmitter } from "../../event_bus/eventEmitter";
import { Card, DeckCard } from "./cards";
import { Player } from "./player";

type StateTable = "running" | "waitingForPlayers";

export class Table {
    public id: string
    public minBet: number;
    private minPlayers: number;
    private maxPlayers: number;
    private pot: number;
    private lockedTable: boolean;
    public chairs: Player[];
    public flop: Card[];
    public turn: Card;
    public river: Card;
    public state: StateTable;
    public dealerPosition: number;
    private readonly deckCard: DeckCard;

    constructor(id: string) {
        this.id = id
        this.flop = [];
        this.turn = { naipe: "", value: 1 };
        this.river = { naipe: "", value: 1 };
        this.pot = 0;
        this.chairs = [];
        this.minBet = 10;
        this.minPlayers = 2;
        this.maxPlayers = 7;
        this.lockedTable = false;
        this.state = "waitingForPlayers";
        this.dealerPosition = 0;
        this.deckCard = new DeckCard()
    }

    shuffleCards(){
        this.deckCard.shuffle()
    }
    
    sortCardTable() {
        const [flop1, flop2, flop3, turn, river] = this.deckCard.cards.slice(0, 5);
        this.deckCard.cards.splice(0, 5); 
    
        this.setCardTable({
            flop: [flop1, flop2, flop3],
            turn,
            river
        });
    
        console.log(`🏓 Distribuindo cartas na mesa`);
    }
    
    distributeCardsToPlayers() {
        this.chairs.forEach(playerTable => {
            if(playerTable.state.sitting == true){
                const [card1, card2] = this.deckCard.cards.slice(0, 2);
                
                const player = new Player(playerTable);
                player.setHand({
                    fistCard: card1,
                    secoundCard: card2
                });
            }
        });

        console.log(`🏓 Distribuindo cartas para os players`);
    }

    assignBlinds() {
        const smallBlindIndex = (this.dealerPosition + 1) % this.chairs.length;
        const bigBlindIndex = (this.dealerPosition + 2) % this.chairs.length;

        const smallBlindPlayer = this.chairs[smallBlindIndex];
        const bigBlindPlayer = this.chairs[bigBlindIndex];

        const smallBlindAmount = this.minBet;
        const bigBlindAmount = smallBlindAmount * 2;

        smallBlindPlayer.setBetPot(smallBlindAmount);
        bigBlindPlayer.setBetPot(bigBlindAmount);

        console.log(`🏓 definindo Small blind: ${smallBlindPlayer.name}, Big blind: ${bigBlindPlayer.name}`);
    }

    selectTurnPlayer() {
        const currentTurnIndex = this.chairs.findIndex(player => player.state.myTurn);

        if (currentTurnIndex !== -1) {
            this.chairs[currentTurnIndex].setState({ myTurn: false });
            const nextTurnIndex = (currentTurnIndex + 1) % this.chairs.length;
            this.chairs[nextTurnIndex].setState({ myTurn: true });
        } else {
            this.chairs[0].setState({ myTurn: true });
        }

        console.log(`🏓 selecionando a vez do jogador na mesa`)

        let playerWithTurn = this.chairs.find(player => player.state.myTurn)
        if (playerWithTurn) {
            console.log(`🏓 jogador name: ${playerWithTurn.name} id: ${playerWithTurn.id} tem a vez`)
        }
    }

    setCardTable({ flop, turn, river }: { flop: Card[], turn: Card, river: Card }) {
        this.flop = flop
        this.turn = turn
        this.river = river
    }

    setState(state: StateTable) {
        this.state = state
    }

    setMinBet(value: number) {
        if (value >= 1) {
            this.minBet = value
        }
    }

    sitPlayer(player: Player) {
        if (this.lockedTable == false) {
            this.chairs.push(player);
            console.log(`🏓 Player sentou na mesa - id: ${player.id}, name: ${player.name}`);
            eventEmitter.emit("exibir players da mesa", this)
        }
    }

    kickPlayer(playerId: string){
        this.chairs = this.chairs.filter(e => e.id !== playerId);
        console.log(`🏓 Player com id ${playerId} foi removido da mesa`);
    }

    lookTabe() {
        if (this.chairs.length >= 2 && this.lockedTable == false) {
            this.lockedTable = true
            this.state = "running"
            console.log(`🏓🔒 Mesa trancou para partida`);
            eventEmitter.emit("iniciar partida", this)

        } 
    }

    unLookTabe() {
        if (this.state = "running") {
            this.lockedTable = false
            this.state = "waitingForPlayers"
            console.log(`🏓 Mesa destrancou para aguardar players`);
        } else {
            console.log(`🏓 Mesa não pode destrancar ainsa, esta em uma partida`);
        }
    }
}

const tables: Table[] = []

for(let i = 0; i< 3; i++){
    tables.push(new Table(`table-${i}`))
}

export {tables}
