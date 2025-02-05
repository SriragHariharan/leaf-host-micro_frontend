import React, { lazy, Suspense } from 'react'
const FriendsPage = lazy(() => import('profileMF/FriendsPage'));

function FriendPage() {
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex justify-center items-start">
                <FriendsPage />
            </div>
        </Suspense>
    </div>
  )
}

export default FriendPage