import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './Chat.css';
import io from 'socket.io-client';

const socket = io('https://webapiassignment.ivemobileapp6.repl.co');

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedUserId = localStorage.getItem('userId');
    setUserType(storedUserType);
    setUserId(storedUserId);

    // Listen for new messages from the server
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const newMessage = {
      senderType: userType,
      senderId: userId,
      text: inputText,
    };

    // Emit the message to the server
    socket.emit('sendMessage', newMessage);
    setInputText('');
  };

  const displayMessages = () => {
    return messages.map((message, index) => (
      <ChatMessage key={index} message={message} currentUserType={userType} currentUserId={userId} />
    ));
  };

  return (
    <div className="chat-interface">
      <div className="message-container">{displayMessages()}</div>
      <div className="user-info">
        <strong>User Type:</strong> {userType} | <strong>User ID:</strong> {userId}
      </div>
      <form onSubmit={handleSendMessage} className="input-form">
        <label htmlFor="inputField">Enter message: </label>
        <input id="inputField" type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">Send message</button>
      </form>
    </div>
  );
};

export default Chat;