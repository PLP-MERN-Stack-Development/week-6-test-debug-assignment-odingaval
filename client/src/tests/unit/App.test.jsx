import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App.jsx';

describe('App', () => {
  it('renders heading, counter, and increments on button click', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to the MERN Testing App/i)).toBeInTheDocument();
    expect(screen.getByText(/Count: 0/)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(button);
    expect(screen.getByText(/Count: 1/)).toBeInTheDocument();
  });
}); 