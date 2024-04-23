import React, { useState } from 'react';
import { TaskService } from '../../services/TaskService';
import { useNavigate } from 'react-router-dom';

const CreateTask = ({ onTaskCreated }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('To Do');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !dueDate) {
      setErrorMessage('Title and due date are required.');
      return;
    }

    try {
      await TaskService.createTask({
        title,
        description,
        due_date: dueDate,
        status,
      });
      // onTaskCreated(); // Callback to refresh the task list or navigate
      navigate('/tasks'); // Redirect to tasks page on successful create
    } catch (error) {
      console.error('Failed to create task:', error);
      setErrorMessage(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/tasks'); // Redirect to tasks page on cancel
  };

  return (
    <div className="container mt-4">
      <h2>Create New Task</h2>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="d-flex justify-content-end mt-4">
          <button type="submit" className="btn btn-primary me-2">
            Create
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
