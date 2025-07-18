import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';

describe('Minimal Hook Test', () => {
  function TestComponent() {
    const [count, setCount] = useState(0);
    return (
      <div>
        <span>Count: {count}</span>
        <button onClick={() => setCount(c => c + 1)}>Inc</button>
      </div>
    );
  }

  it('renders and updates state', () => {
    render(<TestComponent />);
    expect(screen.getByText(/Count: 0/)).toBeInTheDocument();
  });
}); 