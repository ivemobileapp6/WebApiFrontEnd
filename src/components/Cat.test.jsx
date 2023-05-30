import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

import Cat from './Cat';



test('Can show correct breeds', async () => {
  render(
    <MemoryRouter>
      <Cat />
    </MemoryRouter>
  );

  const Bengal = await screen.findAllByText('Bengal');

  expect(Bengal.length).toBeGreaterThan(1);


});