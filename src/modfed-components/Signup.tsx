import React, { lazy } from 'react';
import AuthLayout from '../layouts/AuthLayout';

// Lazy load the LoginPage component
const SignupPage = lazy(() => import('authMF/SignupForm'));


function Signup() {
  return (
    <AuthLayout>
      <SignupPage />
    </AuthLayout>
  )
}

export default Signup;
