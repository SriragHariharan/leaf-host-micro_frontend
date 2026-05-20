import React, { lazy, ReactNode, Suspense } from 'react';
import { designRecipes } from '../design-system';
const ImageCarousel = lazy(() => import('authMF/ImageCarousel'));

function AuthLayout({ children }: {children: ReactNode}) {
  return (
    <div className={designRecipes.authSplitLayout}>
      <div className={designRecipes.authSplitCarouselCol}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <ImageCarousel />
        </Suspense>
      </div>
      <div className={designRecipes.authSplitFormCol}>
        <Suspense fallback={<h1>Loading...</h1>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}

export default AuthLayout;
