import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from './Home';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {}
  };
};

test('renders Home component without crashing', () => {
  render(<Home />);
});

test('displays Welcome title and buttons', () => {
  render(<Home />);
  const title = screen.getByText('Welcome to CatAdoption');
  const viewCatsButton = screen.getByText('View Our Cats');
  const learnMoreButton = screen.getByText('Learn More');

  expect(title).toBeInTheDocument();
  expect(viewCatsButton).toBeInTheDocument();
  expect(learnMoreButton).toBeInTheDocument();
});

test('displays cat cards', () => {
  render(<Home />);
  const catNames = ['Whiskers', 'Fluffy', 'Mittens'];

  catNames.forEach((name) => {
    const catCard = screen.getByText(name);
    expect(catCard).toBeInTheDocument();
  });
});