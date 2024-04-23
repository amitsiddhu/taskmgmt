import React, { useState } from 'react';
import { useAuth } from './../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { currentUser, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/tasks");
    } catch (error) {
      setMessage(error.response.data.error);
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleLogin}>
        <h3>Sign In</h3>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {message && <div className="alert alert-info" role="alert">{message}</div>}
        <button type="submit" className="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
  );
};

export default Login;
