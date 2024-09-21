import { Socket } from "socket.io";
import { conectionsUser, playerTableMap } from "../game/events/connections";
import { eventEmitter } from "../event_bus/eventEmitter";
import { tables } from "../game/entities/table";

export class PlayerDisconnectedUsecase {
    constructor(){
        eventEmitter.on('player desconectou', this.handle.bind(this));
    }
    
    handle({ socket }: { socket: Socket }) {
        const playerId = conectionsUser.get(socket); 
        console.log(`💻🤦‍♂️ Player desconectou`);


        if (playerId) {
            conectionsUser.delete(socket); 
            const tableId = playerTableMap.get(playerId); 

            if (tableId) {
                const table = tables.find(t => t.id === tableId);
                if (table) {
                    //verificar se p player que caiu tem a vez, se sim passa a vez
                    const player  = table.chairs.find(e => e.id == playerId)
                    table.kickPlayer(playerId);

                    if(player && player.state.myTurn == true){
                        console.log(`🙋 player desconectado tinha a vez`)
                        
                        setTimeout(() => {
                            if(table.chairs.length > 1){
                                table.selectTurnPlayer()
                                console.log(`🏓 passando a vez para outro player`)
                            }else{
                                table.setState("waitingForPlayers")
                                console.log(`🏓 aguardando players`)
                            }
                        }, 2000);
                    }

                    eventEmitter.emit("exibir players da mesa", table);
                }
            }
        } else {
            console.log("Jogador não encontrado");
        }
    }
}
