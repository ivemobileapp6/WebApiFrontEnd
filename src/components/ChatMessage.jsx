import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, currentUserId }) => {
  const messageClass = message.senderId === currentUserId ? 'message-right' : 'message-left';

  return (
    <div className={`chat-message ${messageClass}`}>
      <p>
        <strong>{message.senderType} ({message.senderId}):</strong> {message.text}
      </p>
    </div>
  );
};

export default ChatMessage;
