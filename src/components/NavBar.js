// frontend/src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  nav: {
    padding: '12px 20px',
    borderBottom: '2px solid #eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#f9f9f9',
  },
  link: {
    marginRight: 15,
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
  },
  btn: {
    padding: '6px 12px',
    border: 'none',
    background: '#ff4d4d',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div>
        <Link to="/home" style={styles.link}>Home</Link>
        {token && <Link to="/users" style={styles.link}>Users</Link>}
      </div>
      <div>
        {!token ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.btn}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
