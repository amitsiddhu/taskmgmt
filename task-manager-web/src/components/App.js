import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import EditProfile from './auth/EditProfile';
import CreateTask from './tasks/CreateTask';
import EditTask from './tasks/EditTask';
import TaskList from './tasks/TaskList';
import PrivateRoute from './PrivateRoute';
import { useAuth } from './../contexts/AuthContext';

function App() {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };


  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">Task Manager</Link>
            <div className="navbar-nav mr-auto">
              {currentUser ? (
                <>
                  <li className="nav-item">
                    <Link to="/tasks" className="nav-link">Tasks</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <a onClick={handleLogout} className="nav-link" style={{cursor: 'pointer'}}>Logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                  </li>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/tasks" element={<PrivateRoute currentUser={currentUser}><TaskList /></PrivateRoute>} />
            <Route path="/task/create" element={<PrivateRoute currentUser={currentUser}><CreateTask /></PrivateRoute>} />
            <Route path="/task/edit/:id" element={<PrivateRoute currentUser={currentUser}><EditTask /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute currentUser={currentUser}><EditProfile /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/tasks" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
