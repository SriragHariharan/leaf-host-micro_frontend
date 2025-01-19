import React, { lazy } from 'react';
import AuthLayout from '../layouts/AuthLayout';

// Lazy load the LoginPage component
const ValidateOtpForm = lazy(() => import('authMF/OtpForm'));


function ValidateOTP() {
  return (
    <AuthLayout>
      <ValidateOtpForm />
    </AuthLayout>
  )
}

export default ValidateOTP;
