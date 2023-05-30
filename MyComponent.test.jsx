import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from './MyComponent.jsx';
import '@testing-library/jest-dom/extend-expect';

describe('MyComponent', () => {
  it('renders the correct text', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello, World!')).toBeInTheDocument(); // Use the toBeInTheDocument matcher
  });
});