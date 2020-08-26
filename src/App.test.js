import React from 'react';
import { render, fireEvent, wait, screen, cleanup } from '@testing-library/react';
import App from './App';
import About from './components/Welcome.js';

afterEach(cleanup);

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

test("Conditional Nav-Links", () => {
  const { queryByText } = render(<App />)
  const budgets = screen.queryByText("Budget Breakdown", { exact: false})
  expect(budgets).toBeNull();
})

// test("Conditional Nav-Links", () => {
//   const { queryByText } = render(<App user={{id:1}} />)
//   const budgets = screen.queryByText("Budget Breakdown", { exact: false})
//   expect(budgets).toBeInTheDocument();
// })