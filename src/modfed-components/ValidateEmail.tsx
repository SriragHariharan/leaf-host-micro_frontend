import React, { lazy } from 'react';
import AuthLayout from '../layouts/AuthLayout';

// Lazy load the LoginPage component
const ValidateEmailForm = lazy(() => import('authMF/EmailForm'));


function ValidateEmail() {
  return (
    <AuthLayout>
      <ValidateEmailForm />
    </AuthLayout>
  )
}

export default ValidateEmail;
