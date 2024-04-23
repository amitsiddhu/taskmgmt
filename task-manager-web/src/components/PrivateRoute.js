import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';

// A wrapper for routes that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const user = getCurrentUser();

  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
