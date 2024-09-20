import { Socket } from "socket.io";

export class Connections {
    private map: Map<Socket, string>;

    constructor() {
        this.map = new Map<Socket, string>();
    }

    get(socket: Socket): string | undefined {
        return this.map.get(socket);
    }

    set(socket: Socket, id: string): void {
        this.map.set(socket, id);
    }

    delete(socket: Socket): boolean {
        return this.map.delete(socket);
    }
}
