import React, { lazy, Suspense } from 'react';

const PostsPage = lazy(() => import('profileMF/PostsPage'));

function SharedPostPage() {
  return (
      <Suspense fallback={<h1>Loading Dinkan...</h1>}>
        <PostsPage />
      </Suspense>
  );
}

export default SharedPostPage;