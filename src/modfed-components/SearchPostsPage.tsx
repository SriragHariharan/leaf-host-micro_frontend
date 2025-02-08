import React, { lazy, Suspense } from 'react';

const SearchPosts = lazy(() => import('profileMF/SearchPosts'));

function SearchPostsPage() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
        <SearchPosts />
    </Suspense>
  )
}

export default SearchPostsPage