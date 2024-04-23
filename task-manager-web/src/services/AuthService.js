import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Set up the common header for all requests
const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

export const register = (email, password, passwordConfirmation) => {
  return axios.post(`${API_URL}/signup`, {
    user: {
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  });
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/authenticate`, {
    user: { email, password },
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/current`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const response = await axios.patch(`${API_URL}/users/${userId}`, { user: userData }, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AuthService = {
  getUser,
  updateUser,
  deleteUser,
};