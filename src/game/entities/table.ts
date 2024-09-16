import { Card } from "./cheap";
import { Player } from "./player";
import { Dealer } from "./dealer";

export class Table {
    private readonly maxPlayers: number = 10;
    private places: Player[] = [];
    public Flop: Card[] = [];
    public Turn: Card[] = [];
    public River: Card[] = [];
    public Pot: number = 0;
    private dealer: Dealer; 

    constructor(
        private readonly tableId: string = ""
    ) {
        this.dealer = new Dealer();  
    }

    getTableId(): string {
        return this.tableId;
    }

    // Pot
    setPot(value: number): void {
        this.Pot += value;
    }

    getPot(): number {
        return this.Pot;
    }

    // Cartas comunitárias
    setFlop({ card1, card2, card3 }: { card1: Card, card2: Card, card3: Card }): void {
        this.Flop = [card1, card2, card3];
    }

    setTurn({ card }: { card: Card }): void {
        this.Turn = [card];
    }

    setRiver({ card }: { card: Card }): void {
        this.River = [card];
    }

    // Jogadores
    getPlayers(): Player[] {
        return this.places;
    }

    addPlayer({ player }: { player: Player }): void {
        if (this.places.length >= this.maxPlayers) {
            console.log("Esta mesa está cheia.");
            return;
        }
        this.places.push(player);
    }

    removePlayer(playerId: number): void {
        const index = this.places.findIndex(player => player.getId() === playerId);
        if (index === -1) {
            console.log("Jogador não encontrado na mesa.");
            return;
        }
        this.places.splice(index, 1);
    }

    // Métodos para interagir com o Dealer
    dealToPlayers(): void {
        this.dealer.dealToPlayers(this);  
    }

    dealCommunityCards(): void {
        this.dealer.dealCommunityCards(this);  
    }

    resetDeck(): void {
        this.dealer.resetDeck();
    }
}
