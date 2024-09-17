import { Player } from "./entities/player";
import { Table } from "./entities/table";

const player1 = new Player({
    id: "id-player-1",
    name: "Gabriel"
})

const table = new Table({
    minBet: 0
})

table.sitPlayer(player1)