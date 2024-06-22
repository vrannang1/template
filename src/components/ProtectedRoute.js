import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const { notify } = useNotification();

  useEffect(() => {
    if (!user) {
      notify('You need to be logged in to access this page.');
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      notify('You do not have permission to access this page.');
    }
  }, [user, allowedRoles, notify]);

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
