import io from 'socket.io-client';
let socket: any;

export const initiateSocket = (room?: string) => {
    socket = io('http://localhost:3000');
    console.log(`Connecting socket...`);
    if (socket && room) socket.emit('join', room);
}
export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
}
export const joinRoom = (room: string, messageCallback: Function) => {
    if (!socket) return (true);
    socket.emit('join-room', room)
    socket.on('chat-message', (msg: any) => {
        console.log('Websocket event received!');
        return messageCallback(msg);
    });
}

export const leaveRoom = (room: string) => {
    socket.emit('leave-room', room)
}

export const sendMessage = (message: string) => {
    if (socket) socket.emit('chat-message', {message});
}