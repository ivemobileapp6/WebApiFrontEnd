/**
 * Chat component
 *
 * It uses the Socket.IO library for real-time communication and React hooks for state management.
 * Users can input a room number to join and then send messages within that room. 
 * Message style is similar to WhatsApp
 */

import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import './Chat.css';

const socket = io.connect('https://webapiassignment.ivemobileapp6.repl.co');

function Chat() {
  // Room State
  const [room, setRoom] = useState('');

  // Messages States
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { message, room });
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: message, isOwnMessage: true },
      ]);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: data.message, isOwnMessage: false },
      ]);
    });
  }, []);

return (
  <div className="App">
    <p>To chat with staff, please join room 1</p>

    <div className="chatContainer">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1>Messages:</h1>
      <ul className="messageList">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={msg.isOwnMessage ? 'ownMessage' : 'otherMessage'}
          >
            {msg.content}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default Chat;