import { Socket } from "socket.io";

// usar um banco de dados como Redis
export const conectionsUser =  new Map<Socket, string>()
export const playerTableMap = new Map<string, string>();