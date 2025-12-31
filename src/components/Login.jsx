import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Set your girlfriend's credentials here
  const CREDENTIALS = {
    username: 'DumbDoremon',
    password: 'DvGn1408'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      setAuth(true);
      navigate('/home');
    } else {
      setError('Invalid credentials! Try again 💕');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="hearts-bg">
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
      </div>
      <div className="login-box">
        <h1 className="login-title">💕 Hii Babygirl 💕</h1>
        <p className="login-subtitle">Enter to see your special surprise</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">
            Enter 💖
          </button>
        </form>
        <p className="hint">Hint: Username: mylove | Password: newyear2026</p>
      </div>
    </div>
  );
}

export default Login;
