import { Table } from "../entities/table";

export class DealCards {
    constructor(
        private readonly table: Table
    ){}

    execute(){
        console.log(">>> gameplay: Distribuindo cartas da mesa (flop, turn, river)...");
        console.log(">>> gameplay: Distribuindo cartas para os jogadores sentados à mesa...");
    }
}