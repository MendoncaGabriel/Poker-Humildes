import { useState, useEffect } from 'react';
import { connectSocket, disconnectSocket, sendMessage, setupSocketListeners } from '../utils/socket';

const useSocket = (apiUrl) => {
  const [isConnected, setIsConnected] = useState(false);
  const [players, setPlayers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Usuário desconectado');
  const [socket, setSocket] = useState(null);
  const [turn, setTurn] = useState(false);
  const [playerId, setPlayerId] = useState("");

  useEffect(() => {
    if (socket) {
      setupSocketListeners(socket, (message) => {
        console.log("Mensagem recebida:", message); // Adicionando log

        if (message.msg === 'exibir players da mesa') {
          setPlayers(message.chairs);
        } else if (message.msg === 'Mesa cheia' || message.msg === 'Mesa fechada') {
          alert(message.msg);
        } else if (message.msg === "Sua vez") {
          setStatusMessage("É a sua vez!");
          setTurn(true);
        }
      }, () => {
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
    }

    return () => {
      if (socket) {
        disconnectSocket(socket);
      }
    };
  }, [socket, playerId]);

  const connect = () => {
    const newPlayerId = `${Date.now()}`;
    setPlayerId(newPlayerId);

    const newSocket = connectSocket(apiUrl);
    setSocket(newSocket);
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
  };
};

export default useSocket;
