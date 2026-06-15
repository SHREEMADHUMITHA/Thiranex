import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div className="app-container">
      <header style={{ padding: '10px 20px', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Task Manager</h1>
        {token && <button onClick={logout} style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '8px 12px', cursor: 'pointer' }}>Logout</button>}
      </header>
      <main style={{ padding: '20px' }}>
        {!token ? <Auth setToken={(t) => { localStorage.setItem('token', t); setToken(t); }} /> : <Dashboard token={token} />}
      </main>
    </div>
  );
}

export default App;
