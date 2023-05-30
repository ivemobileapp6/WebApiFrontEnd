import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';

import FavouriteCats from './Favourite.jsx';

const mock = new axiosMock(axios);

const fakeCats = [
  {
    _id: '1',
    breed: 'Breed 1',
    age: 2,
    gender: 'Male',
    photos: ['photo1.jpg'],
    description: 'Breed 1 description',
  },
  {
    _id: '2',
    breed: 'Breed 2',
    age: 3,
    gender: 'Female',
    photos: ['photo2.jpg'],
    description: 'Breed 2 description',
  },
];

test('renders FavouriteCats component without crashing', () => {
  render(<FavouriteCats />);
});

test('displays fetched favorite cats', async () => {
  localStorage.setItem('userId', '123');
  mock.onGet('https://webapiassignment.ivemobileapp6.repl.co/favourites/123').reply(200, fakeCats);

  render(<FavouriteCats />);

  // Wait for fetched favorite cats to be displayed
  await waitFor(() => screen.getByText('Breed 1'));

  // Check if the fetched favorite cats are displayed
  expect(screen.getByText('Breed 1')).toBeInTheDocument();
  expect(screen.getByText('Breed 2')).toBeInTheDocument();
});  