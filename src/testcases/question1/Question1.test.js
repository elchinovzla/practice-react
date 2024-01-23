import { render, fireEvent, screen } from '@testing-library/react';
import Question1 from './Question1';

test('renders initial login message', () => {
  render(<Question1 />);
  const initialWelcomeMessage = screen.getByText('Please Log In');
  expect(initialWelcomeMessage).toBeVisible();
});

test('renders welcome user if the login button is clicked once', () => {
  render(<Question1 />);

  fireEvent.click(screen.getByText('Log in'));
  const loggedInMessage = screen.getByText('Welcome User!');
  expect(loggedInMessage).toBeVisible();
});

test('redners initial login message again if login button is clickec twice', () => {
  render(<Question1 />);
  fireEvent.click(screen.getByText('Log in'));
  fireEvent.click(screen.getByText('Log out'));
  const loggedOutMessage = screen.getByText('Please Log In');
  expect(loggedOutMessage).toBeVisible();
});
