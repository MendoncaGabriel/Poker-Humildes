import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({});

  const handCarPlayer = [
    { value: 7, naipe: "Diamonds" },
    { value: 6, naipe: "Spades" }
  ]

  const cardsTable = {
    flop: [
      { value: 10, naipe: "Hearts" },
      { value: 9, naipe: "Spades" },
      { value: 8, naipe: "Diamonds" }],
    turn: { value: 7, naipe: "Clubs" },
    river: { value: 6, naipe: "Spades" }
  }

  const principalPlayer = {
    id: "ds1ds5d1sd16",
    name: "Jhoe Due",
    wallet: 1501
  }

  const players = [
    { name: "name player" },
    { name: "name player" },
    { name: "name player" },
    { name: "name player" },
    { name: "name player" },
    { name: "name player" },
    { name: "name player" },
    { name: "name player" },
    { name: "name player" }
  ]
  const pot = 0

  useEffect(() => {
    setGlobal((prev) => ({
      ...prev,
      handCarPlayer,
      pot,
      players,
      cardsTable,
      turnPlayer: true,
      isConnected: true,
      principalPlayer,
      timer: 20,
      statusMessage: "Usuário desconectado"
    }));
  }, []);

  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
};
