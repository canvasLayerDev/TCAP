import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaLock, FaSignInAlt, FaArrowRight } from 'react-icons/fa';
import blogApi from '../../services/blogApi';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await blogApi.login({ username, password });
      if (response.status === 'true' && response.token) {
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        setError(response.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err?.message || 'Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to access your administrative dashboard.</p>
        </div>
        
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <span className="input-icon"><FaUserCircle /></span>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="login-btn" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              <>
                Login <FaArrowRight className="ms-2" />
              </>
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p className="secure-note"><FaSignInAlt className="me-1" /> Secure Authentication</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
