import React, { lazy, Suspense } from 'react';

const SearchPage = lazy(() => import('profileMF/SearchPage'));

function SearchPageWrapper() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <SearchPage />
    </Suspense>
  );
}

export default SearchPageWrapper;
