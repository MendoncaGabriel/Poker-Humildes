import { useState, useEffect } from 'react';
import { connectSocket, disconnectSocket, sendMessage, setupSocketListeners } from '../utils/socket';

const useSocket = (apiUrl) => {
  const [isConnected, setIsConnected] = useState(false);
  const [players, setPlayers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Usuário desconectado');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket) {
      setupSocketListeners(socket, (message) => {
        if (message.msg === 'exibir players da mesa') {
          setPlayers(message.chairs);
        }
        if (message.msg === 'Mesa cheia' || message.msg === 'Mesa fechada') {
          alert(message.msg);
        }
      }, () => {
        setIsConnected(false);
        setStatusMessage('Usuário desconectado');
        setPlayers([]);
      });

      socket.on('connect', () => {
        setIsConnected(true);
        setStatusMessage('Usuário Conectado!');
        
        sendMessage(socket, {
          msg: "sentar player na mesa",
          data: {
            player: {
              id: `id-${Date.now()}`,
              name: "jhoe due"
            },
            room: {
              id: "sala-1"
            }
          },
        });
      });
    }

    return () => {
      if (socket) {
        disconnectSocket(socket);
      }
    };
  }, [socket, apiUrl]);

  const connect = () => {
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
    disconnect
  };
};

export default useSocket;
