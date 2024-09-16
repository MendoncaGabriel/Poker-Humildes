import { Player } from "./player";
import { Table } from "./table";
import { Cheap } from "./cheap";

// Criando o baralho e a mesa
const deck = new Cheap();
const table = new Table();

// Criando dois jogadores
const player1 = new Player({name: "gabriel", playerId: 1});
const player2 = new Player({name: "vitoria", playerId: 1});
console.log("-------------------------")
console.log(player1)
console.log(player2)
console.log("-------------------------")

// Adicionando os jogadores à mesa
table.addPlayer(player1);
table.addPlayer(player2);

// Distribuindo cartas para os jogadores
player1.addCardsToHand({ card1: deck.dealCard()!, card2: deck.dealCard()! });
player2.addCardsToHand({ card1: deck.dealCard()!, card2: deck.dealCard()! });

// Exibindo as mãos dos jogadores
console.log("Mãos dos jogadores:");
console.log(`Jogador 1: `, player1.getHand());
console.log(`Jogador 2: `, player2.getHand());

// Exibindo quantas cartas restam no baralho
console.log("-------------------------")
console.log("Cartas restantes no baralho:", deck.remainingCards());
