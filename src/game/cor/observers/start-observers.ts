import { randomUUID } from "crypto";
import { Observer } from "../../utils/observer";
import { Table } from "../../entities/table";

const createTable: Observer = {
    update(dado) {
        console.log('Contruindo mesas do jogo...', dado);
        let maxTables = 5
        let tables = []
        for(let i = 0; i< maxTables; i++){
            const uuid = randomUUID()
            const table = new Table(uuid)
            tables.push(table)
        }
        return tables
    },
}