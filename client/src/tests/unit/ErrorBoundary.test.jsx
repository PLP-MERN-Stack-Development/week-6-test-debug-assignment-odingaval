import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary.jsx';

function ProblemChild() {
  throw new Error('Test error!');
}

describe('ErrorBoundary', () => {
  it('catches error from child and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Test error!/i)).toBeInTheDocument();
  });
}); 