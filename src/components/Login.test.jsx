import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Login from './Login';
import Google from './Google';

jest.mock('./Google', () => {
  return () => <div data-testid="google-login"></div>;
});

test('renders Login component without crashing', () => {
  render(<Login />);
});

test('displays form elements', () => {
  render(<Login />);
  const emailLabel = screen.getByText('Email:');
  const passwordLabel = screen.getByText('Password:');
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');

  expect(emailLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('displays Google component', () => {
  render(<Login />);
  const googleComponent = screen.getByTestId('google-login');
  expect(googleComponent).toBeInTheDocument();
});