export class SitPlayer {
  handle(data: any){
    const { player, room, socket } = data;
    console.log(player, room)
    console.log(`👤 Jogador ${player.name} sentado na mesa da sala ${room.id}.`);
  }
}


// async function handleSitPlayer(data: any): Promise<void> {
//     const { player, room } = data;
//     console.log(`👤 Jogador já está na mesa.`);
//     return

//     this.playerConnections.set(this.socket, player.id);
    

//     // const table = await this.getTableByRoomId(room.id);
//     const table = eventEmitter.emit('get table by id', { room.id });

//     const newPlayer = new Player({ id: player.id, name: player.name });
//     newPlayer.state = { sitting: true };

//     // Verificar se o jogador já está na mesa
//     const existingPlayer = table.chairs.find(chair => chair.id === player.id);
//     if (existingPlayer) {
//         console.log(`👤 Jogador ${player.id} já está na mesa.`);
//         return; // Jogador já está na mesa, nada a fazer
//     }


//     try {
//         table.sitPlayer(newPlayer);
//         this.socketManager.sendToAll({
//             msg: "exibir players da mesa",
//             chairs: table.chairs
//         });
//     } catch (error) {
//         console.error('❌ Erro ao sentar jogador:', error);
//         this.socketManager.sendToAll({ msg: '⚠️ Erro ao sentar jogador' });
//     }

// }