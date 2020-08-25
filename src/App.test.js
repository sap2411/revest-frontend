import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import App from './App';

test('renders landing page', () => {
  const { getByText } = render(<App />);
  const title = getByText("Personal finance and investng doesn't have to be intimidating.");
  expect(title).toBeInTheDocument();
});
