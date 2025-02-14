import React, { lazy, Suspense } from 'react'
const Conversations = lazy(() => import('chatMF/Conversations'));
function ConversationsPage() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
        <Conversations />
    </Suspense>
  )
}

export default ConversationsPage