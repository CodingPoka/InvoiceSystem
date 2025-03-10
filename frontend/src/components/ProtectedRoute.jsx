// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../validation/auth';


const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" replace />;
  }

  // Render the child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;