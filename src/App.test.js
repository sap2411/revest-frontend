import React from 'react';
import { render, fireEvent, wait, screen, cleanup } from '@testing-library/react';
import App from './App';
import user from '@testing-library/user-event';
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

test('User can either log in or create an account', () => {
  const { getByText } = render(<App />);
  const button = screen.getByText("Let's Get Started!", { exact: false });
  user.click(button);
  const loginLink = screen.getByText("sign in")
  expect(loginLink).toBeInTheDocument();
  user.click(loginLink)
  expect(screen.getByText("Welcome Back")).toBeInTheDocument();
})

test("Conditional Nav-Links", () => {
  const { queryByText } = render(<App />)
  const budgets = screen.queryByText("Budget Breakdown", { exact: false})
  expect(budgets).toBeNull();
})

test('While not logged in, user can click through to the resource page', () => {
  const { queryByText } = render(<App />)
  const resources = screen.getByText("Investment Resources", { exact: false });
  expect(resources).toBeInTheDocument();
  user.click(resources)
  const resourcePage = screen.getByText('Lets get you investing!')
  expect(resourcePage).toBeInTheDocument
})