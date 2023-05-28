import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import About from './About.jsx';

test('renders the main title', () => {
  render(<About />);
  expect(screen.getByText('About Us')).toBeInTheDocument();
});