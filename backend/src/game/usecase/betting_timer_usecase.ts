import { table } from "console";
import { Player } from "../entities/player";
import { Table } from "../entities/table";
import { eventEmitter } from "../event_bus/eventEmitter";

export class BettingTimerUseCase {
    constructor(){
        eventEmitter.on("aguardando jogador apostar", this.handle.bind(this))
    }
    handle({player, table}: {player: Player, table: Table}){
        let time = 0
        let maxTime = 20

        let loop = setInterval(()=>{
            time++
            if(time == maxTime){
                clearInterval(loop)
                console.log("O tempo acabou!")
                //verificar se o player apostou
                //se n apostou dar fold automatico
                table.selectTurnPlayer((player)=>{
                    console.log(`a vez foi passada para outro jogador, name: ${player.name}, id: ${player.id}`)
                })
                player.setAction()
                //se apostou cancelar timer e passar a vez
            }else{
                console.log(`Timer: ${time}`)
            }

        }, 1000)

    }
}