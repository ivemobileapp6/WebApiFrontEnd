import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './Home';

describe('Home', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('renders Home component without crashing', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  test('displays Welcome title and buttons', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const title = screen.getByText('Welcome to CatAdoption');
    const viewCatsButton = screen.getByText('View Our Cats');
    const learnMoreButton = screen.getByText('Learn More');

    expect(title).toBeInTheDocument();
    expect(viewCatsButton).toBeInTheDocument();
    expect(learnMoreButton).toBeInTheDocument();
  });

  test('displays cat cards', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const catNames = ['Whiskers', 'Fluffy', 'Mittens'];

    catNames.forEach((name) => {
      const catCard = screen.getByText(name);
      expect(catCard).toBeInTheDocument();
    });
  });
});