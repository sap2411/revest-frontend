import React from 'react';
import { render, fireEvent, wait, screen } from '@testing-library/react';
import App from './App';
import About from './components/Welcome.js';

test('Renders landing page', () => {
  const { getByText } = render(<App />);
  const title = screen.getByText("Personal finance and investng doesn't have to be intimidating.");
  expect(title).toBeInTheDocument();
});

test('Conditionally renders log-in button for new user', () => {
  const { getByText } = render(<App />);
  const button = screen.getByText("Let's Get Started!", { exact: false });
  expect(button).toBeInTheDocument();
})