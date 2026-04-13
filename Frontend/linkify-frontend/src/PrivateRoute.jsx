import React from 'react'
import { useStoreContext } from './contextApi/ContextApi'
import { Navigate } from 'react-router-dom';

 export const PrivateRoute = ({ publicPage, children }) => {
  const { token } = useStoreContext;
  if (publicPage) {
    return token ? <Navigate to="/dashboard" /> : children;
  }
  return token ? children : <Navigate to="/login" />;
}

