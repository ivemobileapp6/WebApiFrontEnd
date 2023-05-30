import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddCat from './AddCat';

describe('AddCat component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
   it('when user is a staff', () => {
    Storage.prototype.getItem = jest.fn(() => 'staff');
    render(<AddCat />);

    expect(screen.queryAllByText('Add Cat')[0]).toBeInTheDocument();
  
    expect(screen.getByRole('button', { name: /Add Cat/i })).toBeInTheDocument();
  });


  it('when user is not staff', () => {
    Storage.prototype.getItem = jest.fn(() => 'user');
    render(<AddCat />);

    expect(screen.queryAllByText('Add Cat').length).toBe(0);
    expect(screen.queryAllByRole('button', { name: /Add Cat/i }).length).toBe(0);

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.getByText('You must be a staff member to add a cat.')).toBeInTheDocument();
  });
});