import React, { lazy, Suspense } from "react";

const Chat = lazy(() => import('chatMF/Chat'));
function ChatPage() {
    
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Chat />
    </Suspense>
  )
}

export default ChatPage