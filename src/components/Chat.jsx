import React, { useState, useEffect } from 'react';
import './Chat.css';
import io from 'socket.io-client';

const socket = io('https://webapiassignment.ivemobileapp6.repl.co');

const Chat = () => {
   const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [userType, setUserType] = useState('');
  const [roomId, setRoomId] = useState('');
  const [chatActive, setChatActive] = useState(false);

  useEffect(() => {
    if (chatActive) {
      socket.on('roomCreated', (roomId) => {
        setRoomId(roomId);
      });

      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [chatActive]);

  useEffect(() => {
    if (roomId) {
      socket.emit('joinChatRoom', { roomId });
    }
  }, [roomId]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    socket.emit('sendMessage', {
      senderId: userType,
      text: inputText,
      roomId,
    });
    setInputText('');
  };

  const handleChatButtonClick = () => {
    setChatActive(true);
    if (userType === 'public') {
      socket.emit('createChatRoom');
    }
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div>
        <button onClick={() => setUserType('public')}>Public User</button>
        <button onClick={() => setUserType('staff')}>Staff User</button>
      </div>
      {userType && (
        <div>
          <h2>{userType === 'public' ? 'Public' : 'Staff'} User</h2>
          {userType === 'staff' && (
            <div>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Room ID"
              />
            </div>
          )}
          <button onClick={handleChatButtonClick}>Start Chat</button>
          {chatActive && (
            <div>
              <h3>Chat</h3>
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>{`${message.senderId}: ${message.text}`}</li>
                ))}
              </ul>
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type a message"
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;