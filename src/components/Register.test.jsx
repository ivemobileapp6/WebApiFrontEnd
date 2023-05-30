import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import RegisterForm from './Register';

test('renders RegisterForm component without crashing', () => {
  render(<RegisterForm />);
});

test('displays form elements', () => {
  render(<RegisterForm />);
  const nameInput = screen.getByPlaceholderText('Name');
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const phoneNumberInput = screen.getByPlaceholderText('Phone Number');
  const userTypeSelect = screen.getByText('Public');
  const registerButton = screen.getByText('Register');

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(phoneNumberInput).toBeInTheDocument();
  expect(userTypeSelect).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
});

test('displays staff key input when userType is staff', () => {
  render(<RegisterForm />);

  const userTypeSelect = screen.getByRole('combobox');
  fireEvent.change(userTypeSelect, { target: { value: 'staff' } });

  const staffKeyInput = screen.getByPlaceholderText('Staff Key');
  expect(staffKeyInput).toBeInTheDocument();
});