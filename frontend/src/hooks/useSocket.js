import { useState, useEffect } from 'react';
import { connectSocket, disconnectSocket, sendMessage, setupSocketListeners } from '../utils/socket';

const useSocket = (apiUrl) => {
  const [isConnected, setIsConnected] = useState(false);
  const [players, setPlayers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Usuário desconectado');
  const [socket, setSocket] = useState(null);
  const [turn, setTurn] = useState(false);
  const [playerId, setPlayerId] = useState("");
  const [timer, setTimer] = useState(0);
  const [cards, setCards] = useState({});

  useEffect(() => {
    if (socket) {
      const handleMessage = (message) => {
        console.log("Mensagem recebida:", message);
        if (message.msg === 'exibir players da mesa') {
          setPlayers(message.chairs);
        } else if (message.msg === 'Mesa cheia' || message.msg === 'Mesa fechada') {
          alert(message.msg);
        } else if (message.msg === "Sua vez") {
          setStatusMessage("É a sua vez!");
          setTurn(true);
        } else if (message.msg === "o tempo acabou") {
          setTurn(false);
          setStatusMessage("O tempo acabou");
        } else if (message.msg === "timer") {
          setTimer(message.value);
        } else if (message.msg === "your cards") {
          setCards(message.cards);
        }
      };

      setupSocketListeners(socket, handleMessage, () => {
        setIsConnected(false);
        setStatusMessage('Usuário desconectado');
        setPlayers([]);
      });

      socket.on('connect', () => {
        setIsConnected(true);
        setStatusMessage('Usuário Conectado!');

        if (playerId) {
          sendMessage(socket, {
            msg: "conectar player a mesa",
            player: {
              id: playerId,
              name: "jhoe due"
            },
            table: {
              id: "table-1"
            }
          });
        } else {
          console.warn('Player ID não definido!');
        }
      });

      return () => {
        // Remova os listeners quando o componente for desmontado ou o socket mudar
        disconnectSocket(socket);
      };
    }
  }, [socket, playerId]);

  const connect = () => {
    if (!socket) {
      const newPlayerId = `${Date.now()}`;
      setPlayerId(newPlayerId);

      const newSocket = connectSocket(apiUrl);
      setSocket(newSocket);
    }
  };

  const disconnect = () => {
    if (socket) {
      disconnectSocket(socket);
      setSocket(null);
    }
    setIsConnected(false);
    setStatusMessage('Usuário desconectado');
    setPlayers([]);
  };

  return {
    isConnected,
    players,
    statusMessage,
    connect,
    disconnect,
    turn,
    playerId,
    timer, 
    cards
  };
};

export default useSocket;
