import React, { useState } from 'react';
import { register } from '../../services/AuthService';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== passwordConfirmation) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      await register(email, password, passwordConfirmation);
      setMessage('Registration successful. You can now log in.');
      // Reset form or redirect user to login page
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (error) {
      setMessage(error.response.data.errors[0]);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        {message && <div className="alert alert-info" role="alert">{message}</div>}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
