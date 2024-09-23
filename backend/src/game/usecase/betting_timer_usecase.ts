import { Table } from "../entities/table";
import { Player } from "../entities/player";
import { socketManager } from "../../server/server";
import { eventEmitter } from "../event_bus/eventEmitter";

export class BettingTimerUseCase {
    constructor(){
        eventEmitter.on("aguardando jogador apostar", this.handle.bind(this))
    }

    handle({player, table}: {player: Player, table: Table}){
        let time = 10

        let loop = setInterval(()=>{
            if(time == 0){
                clearInterval(loop)
                
                player.setState({
                    action: "fold"
                })
                console.log("O tempo acabou!")

                socketManager.sendToUser(player.id, { msg: "o tempo acabou" });

                table.selectTurnPlayer((playerTurn)=>{
                    socketManager.sendToUser(playerTurn.id, { msg: "Sua vez" });
                    console.log(`a vez foi passada para outro jogador, name: ${playerTurn.name}, id: ${playerTurn.id}`)
                })
                
            }else{
                time--
                socketManager.sendToUser(player.id, { msg: "timer", value: time });
            }

        }, 1000)

    }
}