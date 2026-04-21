import React from 'react'
import { useStoreContext } from './contextApi/ContextApi'
import { Navigate } from 'react-router-dom';

  const PrivateRoute = ({ publicPage, children }) => {
  const { token } = useStoreContext();
  if (publicPage) {
    return token ? <Navigate to="/dashboard" /> : children;
  }
  return !token ? <Navigate to="/login" /> : children;
};
export default PrivateRoute
