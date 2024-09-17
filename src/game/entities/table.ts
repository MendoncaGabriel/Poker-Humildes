import { Player } from "./player";

export class Table {
    private minBet: number
    private minPlayers: number
    private maxPlayers: number
    private pot: number
    private lockedTable: boolean
    private chairs: Player[] = []

    constructor({minBet}: {minBet: number}) { 
        this.pot = 0
        this.chairs = [],
        this.minBet = minBet
        this.minPlayers = 2
        this.maxPlayers = 7
        this.lockedTable = false
    }

    setMinBet(value: number){
        if(value >= 1){
            this.minBet = value
        }
    }

    sitPlayer(player: Player): { msg: string } {
        if (this.lockedTable) {
            return { msg: "Mesa fechada" };
        }
        
        if (this.chairs.length >= this.maxPlayers) {
            return { msg: "Mesa cheia" };
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