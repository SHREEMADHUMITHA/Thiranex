import React, { useState } from 'react';
import axios from 'axios';

function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
    try {
      const res = await axios.post(url, formData);
      if (isLogin) {
        setToken(res.data.token);
      } else {
        setMessage('Registration successful! Please Log In.');
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" placeholder="Username" required style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        )}
        <input type="email" placeholder="Email" required style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" required style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#white', border: 'none', cursor: 'pointer' }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '10px', cursor: 'pointer', color: 'blue' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </p>
      {message && <p style={{ textAlign: 'center', color: 'red' }}>{message}</p>}
    </div>
  );
}

export default Auth;
