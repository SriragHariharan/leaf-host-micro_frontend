import React, { lazy, Suspense } from 'react'
const Profile = lazy(() => import('profileMF/ProfilePage'));

function ProfilePage({self}: {self: boolean}) {
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <Profile self={self} />
        </Suspense>
    </div>
  )
}

export default ProfilePage