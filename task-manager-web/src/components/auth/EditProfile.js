import React, { useState, useEffect } from 'react';
import { useAuth } from './../../contexts/AuthContext';
import { AuthService } from '../../services/AuthService';
import { useParams, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    avatar: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await AuthService.getUser();
        setUser({
          id: data.id,
          avatar: data.avatar,
          name: data.name,
          email: data.email
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setErrorMessage('Failed to load user details.');
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AuthService.updateUser(user.id, user);
      setMessage('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update user:', error);
      setErrorMessage('Failed to update user details. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await AuthService.deleteUser(user.id);
      logout();
    } catch (error) {
      console.error('Failed to delete profile:', error);
      setErrorMessage('Failed to delete profile.');
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      {message && <div className="alert alert-info" role="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="avatar"
            name="avatar"
            value={user.avatar}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            value={user.password_confirmation}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary me-2">Update</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;