// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const listenForLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      console.log("Raw response: ", response);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Unknown error occurred');
        return;
      }

      const data = await response.json();
      console.log("Parsed response: ", data);

      if (data.error) {
        setError(data.error);
      } else {
        const { grade } = data;
        if (grade === '1') {
          navigate('/first-grade');
        } else if (grade === 'K') {
          navigate('/kindergarten');
        }
      }
    } catch (error) {
      console.error("Error caught in catch block: ", error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div>
      <h1>Login to Math Studio</h1>
      <input 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Enter your name" 
      />
      <button onClick={listenForLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
