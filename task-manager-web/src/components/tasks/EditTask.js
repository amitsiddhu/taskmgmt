import React, { useState, useEffect } from 'react';
import { TaskService } from '../../services/TaskService';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await TaskService.getTask(id);
        let due_date = new Date(data.due_date);
        due_date = due_date.toISOString().split("T")[0];
        setTask({
          title: data.title,
          description: data.description,
          due_date: due_date,
          status: data.status,
        });
      } catch (error) {
        console.error('Failed to fetch task:', error);
        setErrorMessage('Failed to load task details.');
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await TaskService.updateTask(id, task);
      navigate('/tasks'); // Redirect to tasks page on successful update
    } catch (error) {
      console.error('Failed to update task:', error);
      setErrorMessage('Failed to update task. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/tasks'); // Redirect to tasks page on cancel
  };

  return (
    <div className="container mt-4">
      <h2>Edit Task</h2>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="due_date">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="due_date"
            name="due_date"
            value={task.due_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary me-2">Update Task</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
