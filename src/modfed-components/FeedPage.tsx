import React, { lazy, Suspense } from 'react'
const FeedsPage = lazy(() => import('profileMF/FeedsPage'));

function FeedPage() {
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
                <FeedsPage />
        </Suspense>
    </div>
  )
}

export default FeedPage