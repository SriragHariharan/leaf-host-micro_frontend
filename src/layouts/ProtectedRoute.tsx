import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useStore from '../helpers/globalStore';



const ProtectedRoute: React.FC = () => {
  const { accessToken, refreshToken } = useStore();

  // Check if the user is authenticated
  const isAuthenticated = accessToken || refreshToken;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
