export class Table {
    public Pot: number = 0;

    constructor(private readonly tableId: string = "") {}

    getTableId(): string {
        return this.tableId;
    }

    setPot(value: number): void {
        this.Pot += value;
    }

    getPot(): number {
        return this.Pot;
    }
}
