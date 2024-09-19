import { io } from 'socket.io-client';

export const connectSocket = (url) => {
  const socket = io(url, {
    transports: ['websocket'], // Pode ser necessário para WebSocket
  });
  return socket;
};

export const disconnectSocket = (socket) => {
  if (socket) {
    socket.disconnect();
  }
};
