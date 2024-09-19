import { Table } from "../entities/table";

export class FirstRoundOfPosts {
    constructor(
        private readonly table: Table
    ){}

    execute(){
        this.table.chairs.forEach(player => player.setState({myTurn: false}))

        /*
            primeiro jogador da fila tem a aposta automatica igual ao pot
            segundo jogador da fila tem aposta automatica o dobro do pot
        */
        const minBet = this.table.minBet
        this.table.chairs[0].setBetPot(minBet)
        this.table.chairs[1].setBetPot(minBet * 2)

        /*
            o terceiro jogador tem a vez
            se demorar a escolher uma ação tem que dar fold, passando sua vez
        */
        this.table.chairs[2].setState({
            myTurn: true
        })
    }
}