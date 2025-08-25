// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';

const Home = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await API.get('/api/users/me');
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch (err) {
        console.error('Could not fetch user', err);
      }
    };
    if (!user) fetchMe();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome, {user?.firstName || 'User'}</h1>
        <p style={styles.message}>
          This is your personal dashboard. You're viewing a protected route that requires authentication.
        </p>
        <div style={styles.status}>
          <span style={styles.statusText}>✓ Signed in successfully</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  content: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '30px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center'
  },
  title: {
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '15px'
  },
  message: {
    color: '#666',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px'
  },
  status: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0'
  },
  statusText: {
    color: '#28a745',
    fontSize: '14px'
  }
};

export default Home;