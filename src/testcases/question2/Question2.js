import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setValue];
};

const Question2 = () => {
  const [persistedUsername, setPersistedUsername] = useLocalStorage(
    'username',
    ''
  );
  const [username, setUsername] = useState('');

  return (
    <>
      <input
        type="text"
        placeholder="Enter your name..."
        value={persistedUsername}
        onChange={(e) => setPersistedUsername(e.target.value)}
      />
      <p>Hello, {persistedUsername}!</p>
      <hr />
      <input
        type="text"
        placeholder="Enter your non persisted name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>Hello, {username}!</p>
    </>
  );
};

export default Question2;
