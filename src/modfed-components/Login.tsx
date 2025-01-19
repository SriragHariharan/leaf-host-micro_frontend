import React, { lazy } from 'react';
import AuthLayout from '../layouts/AuthLayout';

// Lazy load the LoginPage component
const LoginPage = lazy(() => import('authMF/LoginForm'));


function Login() {
  return (
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
  )
}

export default Login;
