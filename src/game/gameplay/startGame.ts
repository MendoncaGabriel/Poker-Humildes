import { handleEventGameplay } from "../entities/gameplay";
import { Table } from "../entities/table";

export class StartGame {
    constructor(
        private readonly table: Table
    ){}

    execute(broadcast: any){
        if (this.table.state == "waitingForPlayers" && this.table.chairs.length >= 2) {
            this.table.lookTabe()
            this.table.setState("running")

            handleEventGameplay({
                event: "init bet",
                broadcast
            });
        }
    }
}