import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        const { grade } = data;
        if (grade === '1') {
          history.push('/first-grade');
        } else if (grade === 'K') {
          history.push('/kindergarten');
        }
      }
    } catch (error) {
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
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
