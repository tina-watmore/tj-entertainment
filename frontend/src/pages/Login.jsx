import styles from './login.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useMovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { fetchMovies } = useMovieContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
  }, []);  
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      login({ id: res.data.userId }, res.data.token);
      fetchMovies();
      navigate('/'); // Redirect to home
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.loginContent}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={styles.loginForm}>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email}
                onChange={e => {
                  setEmail(e.target.value); 
                  setError('');
                }} required /><br />
            <input type="password" placeholder="Password" value={password}
                onChange={e => {
                  setPassword(e.target.value); 
                  setError('');
                }} required /><br />
            <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

