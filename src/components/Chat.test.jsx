import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from './Chat';

test('renders Chat component without crashing', () => {
  render(<Chat />);
});

test('join a room and send a message', () => {
  render(<Chat />);

  // Input room number
  const roomInput = screen.getByPlaceholderText('Room Number...');
  fireEvent.change(roomInput, { target: { value: '123' } });
  expect(roomInput.value).toBe('123');

  // Click the Join Room button
  const joinRoomButton = screen.getByText('Join Room');
  fireEvent.click(joinRoomButton);

  // Input a message
  const messageInput = screen.getByPlaceholderText('Message...');
  fireEvent.change(messageInput, { target: { value: 'Hello, World!' } });
  expect(messageInput.value).toBe('Hello, World!');

  // Click the Send Message button
  const sendMessageButton = screen.getByText('Send Message');
  fireEvent.click(sendMessageButton);
});