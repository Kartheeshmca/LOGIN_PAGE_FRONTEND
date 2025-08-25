// frontend/src/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await API.get('/api/users');
        setUsers(res.data);
      } catch (error) {
        setErr(error.response?.data?.message || 'Failed to load users');
      }
    };
    getUsers();
  }, []);

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
    },
    heading: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '15px',
      borderBottom: '2px solid #007bff',
      display: 'inline-block',
      paddingBottom: '5px',
    },
    error: {
      color: 'red',
      marginBottom: '10px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    item: {
      background: '#fff',
      margin: '8px 0',
      padding: '12px 15px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
    },
    itemHover: {
      transform: 'scale(1.02)',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Users (except you)</h2>
      {err && <p style={styles.error}>{err}</p>}
      <ul style={styles.list}>
        {users.map(u => (
          <li
            key={u._id}
            style={styles.item}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <strong>{u.firstName} {u.lastName}</strong><br />
            <span>{u.email}</span> | <span>{u.mobileNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
