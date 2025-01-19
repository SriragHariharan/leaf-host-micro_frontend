import React, { lazy } from 'react';
import AuthLayout from '../layouts/AuthLayout';

// Lazy load the LoginPage component
const ResetPasswordForm = lazy(() => import('authMF/ResetPassword'));


function ResetPassword() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  )
}

export default ResetPassword;
