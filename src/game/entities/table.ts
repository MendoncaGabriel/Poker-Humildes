import { Card } from "./cards";
import { Player } from "./player";

type StateTable = "running" | "waitingForPlayers";


export class Table {
    public minBet: number
    private minPlayers: number
    private maxPlayers: number
    private pot: number
    private lockedTable: boolean
    public chairs: Player[] = []
    public flop: Card[]
    public turn: Card
    public river: Card
    public state: StateTable

    constructor({minBet}: {minBet: number}) { 
        this.flop = []
        this.turn = {naipe: "", value: 1}
        this.river = {naipe: "", value: 1}
        this.pot = 0
        this.chairs = []
        this.minBet = minBet
        this.minPlayers = 2
        this.maxPlayers = 7
        this.lockedTable = false
        this.state = "waitingForPlayers"
    }
    setState(state: StateTable){
        this.state = state
    }

    setFlop(cards: Card[]){
        this.flop = cards
    }
    setTurn(card: Card){
        this.turn = card
    }
    setRiver(card: Card){
        this.river = card
    }

    setMinBet(value: number){
        if(value >= 1){
            this.minBet = value
        }
    }

    sitPlayer(player: Player) {
        if (this.lockedTable) {
            throw new Error("Mesa fechada")
        }
        
        if (this.chairs.length >= this.maxPlayers) {
            throw new Error ("Mesa cheia");
        }

        this.chairs.push(player);
        return { msg: `Player com id ${player.id} sentou na mesa` };
    }

    kickPlayer(playerId: string): { msg: string } {
        const player = this.chairs.find(e => e.id == playerId)
        if (!player) return { msg: `player com id ${playerId}, não esta na mesa` }
        this.chairs = this.chairs.filter(e => e.id !== playerId);
        return { msg: `Player com id ${playerId} foi removido da mesa` };
    }

    lookTabe(){
        this.lockedTable = true
    }
    unLookTabe(){
        this.lockedTable = false
    }
}