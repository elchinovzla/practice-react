import { render, fireEvent, screen } from '@testing-library/react';
import Question2, { useLocalStorage } from './Question2';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

test('useLocalStorage hook sets and gets value from localStorage', () => {
  let testValue;

  function TestComponent() {
    const [value, setValue] = useLocalStorage('testKey', 'initialValue');
    testValue = value;

    return <div onClick={() => setValue('newValue')}>Click me</div>;
  }

  render(<TestComponent />);

  // Initial render
  expect(testValue).toBe('initialValue');

  // Click to set a new value
  fireEvent.click(screen.getByText('Click me'));

  // After the click, the value should be updated
  expect(testValue).toBe('newValue');

  // localStorage should be updated as well
  expect(localStorage.getItem('testKey')).toBe('"newValue"');
});

test('Question2 component renders and interacts correctly', () => {
  render(<Question2 />);

  // Test the persisted input
  const persistedInput = screen.getByPlaceholderText('Enter your name...');
  fireEvent.change(persistedInput, { target: { value: 'John' } });
  expect(persistedInput.value).toBe('John');
  expect(screen.getByText('Hello, John!')).toBeInTheDocument();

  // Test the non-persisted input
  const nonPersistedInput = screen.getByPlaceholderText(
    'Enter your non persisted name...'
  );
  fireEvent.change(nonPersistedInput, { target: { value: 'Doe' } });
  expect(nonPersistedInput.value).toBe('Doe');
  expect(screen.getByText('Hello, Doe!')).toBeInTheDocument();
});
