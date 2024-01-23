import React, { useState } from 'react';
import './Question1.css';

const Question1 = () => {
  const [isUserLogin, setIsUserLogin] = useState(false);

  const handleLogin = (_event) => {
    setIsUserLogin((currentValue) => !currentValue);
  };

  return (
    <div>
      <button onClick={handleLogin}>
        {isUserLogin ? 'Log out' : 'Log in'}
      </button>
      {isUserLogin ? <h1>Welcome User!</h1> : <h1>Please Log In</h1>}
    </div>
  );
};

export default Question1;
