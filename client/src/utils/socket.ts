import io from 'socket.io-client';
import { Message } from '../redux/reducers/chatReducer';

let socket: any;

export const initiateSocket = (room?: string) => {
  socket = io('http://localhost:3000');
  console.log('Connecting socket...');
  if (socket && room) socket.emit('join', room);
};
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};
export const joinRoom = (room: string, messageCallback: Function) => {
  if (!socket) return;
  socket.emit('join-room', room);

  socket.off('chat-message');
  socket.on('chat-message', (msg: any) => {
    console.log('Websocket event received!');
    return messageCallback(msg);
  });
};

export const leaveRoom = (room: string) => {
  socket.emit('leave-room', room);
};

export const sendMessage = (message: Message) => {
  if (socket) socket.emit('chat-message', message);
};
