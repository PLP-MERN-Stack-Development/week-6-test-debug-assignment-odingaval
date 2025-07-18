import React, { useState } from 'react';
import Button from './components/Button';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <ErrorBoundary>
      <div style={{ padding: 32 }}>
        <h1>Welcome to the MERN Testing App</h1>
        <p>Count: {count}</p>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <p>Hello, world!</p>
      </div>
    </ErrorBoundary>
  );
};

export default App; 