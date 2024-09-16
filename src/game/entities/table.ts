import { Card } from "./cheap";
import { Player } from "./player";

export class Table {
    private readonly maxPlayers: number = 10;
    private places: Player[] = [];
    public Flop: Card[] = []; //As três primeiras cartas comunitárias que são viradas de uma vez.
    public Turn: Card[] = []  //A quarta carta comunitária que é colocada na mesa após o Flop.
    public River: Card[] = [] //A quinta e última carta comunitária que é colocada na mesa após o Turn.
    public Pot: number = 0;

    constructor(
        private readonly tableId: number = 0
    ) { }


    getTableId(): number {
        return this.tableId;
    }

    //pot
    setPot(value: number): void {
        this.Pot += value
    }
    getPot() {
        return this.Pot
    }

    // setar as cartas da mesa
    setFlop({ card1, card2, card3 }: { card1: Card, card2: Card, card3: Card }): void {
        this.Flop = [card1, card2, card3]
    }
    setTurn({ card }: { card: Card }): void {
        this.Turn = [card]
    }
    setRiver({ card }: { card: Card }): void {
        this.Turn = [card]
    }

    // metodo para players
    getPlayers(): Player[] {
        return this.places
    }
    addPlayer(player: Player, callback: ()=> void): void {
        if (this.places.length >= this.maxPlayers) {
            console.log("Esta mesa está cheia.");
            return;
        }
        this.places.push(player);

        setTimeout(() => {
            callback()
        }, 1000 * 10);
    }
    removePlayer(playerId: number): void {
        const index = this.places.findIndex(player => player.getId() === playerId);
        if (index === -1) {
            console.log("Jogador não encontrado na mesa.");
            return;
        }
        this.places.splice(index, 1);
    }
}
