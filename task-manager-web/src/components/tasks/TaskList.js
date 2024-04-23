import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TaskService } from '../../services/TaskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortDueDate, setSortDueDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await TaskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setErrorMessage('Failed to load tasks.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await TaskService.deleteTask(id);
      fetchTasks(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete task:', error);
      setErrorMessage('Failed to delete task.');
    }
  };

  const filteredTasks = tasks.filter(task => filterStatus ? task.status === filterStatus : true);

  const handleSortDueDate = async (direction) => {
    try {
      const response = await TaskService.sortTasks({ sort_direction: direction });
      setTasks(response.data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSearch = async (term) => {
    try {
      const response = await TaskService.searchTasks({ search: term });
      setTasks(response.data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Task List</h2>
        <Link to="/task/create" className="btn btn-success">Create New Task</Link>
      </div>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <div className="mb-3">
        <label htmlFor="filterStatus" className="form-label">Filter by Status:</label>
        <select
          id="filterStatus"
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.due_date.split("T")[0]}</td>
              <td>
                <span className={`status-label status-${task.status}`}>
                  {task.status}
                </span>
              </td>
              <td>
                <div className="d-flex justify-content-end">
                  <Link to={`/task/edit/${task.id}`} className="btn btn-sm btn-secondary me-2">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
