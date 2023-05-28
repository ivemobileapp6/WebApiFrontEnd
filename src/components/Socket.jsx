import { io } from 'socket.io-client';

const URL = 'https://webapiassignment.ivemobileapp6.repl.co';
const socket = io(URL);

export default socket;