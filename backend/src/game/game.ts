import { Socket } from "dgram";
import { DeckCard } from "./entities/cards";
import { Dealer } from "./entities/dealer";
import { Table } from "./entities/table";

class Room {
    public card: DeckCard;
    public table: Table;
    public dealer: Dealer;
    public id: string;

    constructor(id: string) {
        this.id = id;
        this.card = new DeckCard();

        
        this.table = new Table({
            minBet: 10,
            dealer: null!, // Use uma asserção de não nulo (ainda não inicializado)
        });

        this.dealer = new Dealer(this.card, this.table); 

        this.table.dealer = this.dealer;
    }
}


class Game {
    public id: string;
    public rooms: Room[];

    constructor(id: string) {
        this.id = id;
        this.rooms = [];

    }

    init() {
        for (let i = 0; i < 3; i++) {
            const room = new Room(`sala-${i}`);
            this.rooms.push(room);
        }
    }

    getRoomById(id: string): Room | undefined {
        return this.rooms.find(room => room.id === id);
    }
}

const game = new Game('game-1');
game.init();

export { game, Room };