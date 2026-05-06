import React, { lazy, ReactNode, Suspense } from 'react';
const ImageCarousel = lazy(() => import('authMF/ImageCarousel'));

function AuthLayout({ children }: {children: ReactNode}) {
  return (
    <div className="h-screen w-screen flex">
      <div className="hidden lg:block w-1/2 h-full">
        <Suspense fallback={<h1>Loading...</h1>}>
          <ImageCarousel />
        </Suspense>
      </div>
      <div className="w-full lg:w-1/2 h-full bg-ds-surface-card">
        <Suspense fallback={<h1>Loading...</h1>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}

export default AuthLayout;
