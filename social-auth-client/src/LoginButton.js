// src/LoginButton.js
import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/salesforce'; // Replace with your backend URL
  };

  return <button onClick={handleLogin}>Login with Salesforce</button>;
};

export default LoginButton;
