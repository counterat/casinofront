import { io } from 'socket.io-client';

const socket = io('https://host.yuriyzholtov.com/'); // URL вашего сервера

export default socket;
