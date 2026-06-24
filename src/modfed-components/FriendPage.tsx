import React, { lazy, Suspense } from 'react'
import { designRecipes } from '@srirag/leaf-design-system';
const FriendsPage = lazy(() => import('profileMF/FriendsPage'));

function FriendPage() {
  return (
    <div className={designRecipes.pageCenter}>
        <Suspense fallback={<div>Loading...</div>}>
                <FriendsPage />
        </Suspense>
    </div>
  )
}

export default FriendPage
