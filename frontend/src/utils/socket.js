import { io } from 'socket.io-client';

export const connectSocket = (url) => {
  console.log(`Connecting to WebSocket: ${url}`);
  const socket = io(url, {
    transports: ['websocket'], 
  });

  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error);
  });

  return socket;
};

export const disconnectSocket = (socket) => {
  if (socket) {
    socket.disconnect();
  }
};

export const sendMessage = (socket, message) => {
  if (socket && socket.connected) {
    socket.emit('message', message);
  } else {
    console.error('Socket is not connected. Unable to send message.');
  }
};

