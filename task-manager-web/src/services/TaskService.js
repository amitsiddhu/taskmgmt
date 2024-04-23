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

const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sortTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const searchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTask = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const TaskService = {
  getTasks,
  sortTasks,
  searchTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
