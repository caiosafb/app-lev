// components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useContext(UserContext);

  if (!authenticated) {
    
    return <Navigate to="/login" replace />;
  }

 
  return children;
};

export default ProtectedRoute;
