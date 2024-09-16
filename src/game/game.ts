import { Table } from './entities/table';
import { Player } from './entities/player';

// Cria uma nova mesa
const table = new Table("mesa-001");

// Adiciona jogadores à mesa
const player1 = new Player({
    name: "Gabriel",
    playerId: 123
});
const player2 = new Player({
    name: "Pedro",
    playerId: 321
});


table.addPlayer({ player: player1 });
table.addPlayer({ player: player2 });

// O Dealer distribui cartas aos jogadores
table.dealToPlayers();

// O Dealer distribui cartas comunitárias
table.dealCommunityCards();





