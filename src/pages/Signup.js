// frontend/src/pages/Signup.jsx
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', mobileNumber: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/api/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
          <input style={styles.input} name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} />
          <input style={styles.input} name="mobileNumber" placeholder="Mobile number" value={form.mobileNumber} onChange={handleChange} required />
          <input style={styles.input} name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input style={styles.input} name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
          <button type="submit" style={styles.button}>Signup</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: '0.3s',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    background: '#2575fc',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
  }
};

export default Signup;
