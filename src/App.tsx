import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './index.scss'

const AuthApp = lazy(() => import('authMF/AuthApp'));

const App = () => (
  // <div>
  //   <Suspense fallback={<div className='text-6xl text-center'>Loading Auth...</div>}>
  //     <AuthApp />
  //   </Suspense>
  // </div>

  <div className="">
    <Router>
      <Routes>
        <Route
         path="/login"
         element={
           <Suspense fallback={<div>Loading Auth...</div>}>
              <AuthApp />
            </Suspense>
        }
      />
      <Route path="/" element={<div>Welcome to the Host Application</div>} />
    </Routes>
  </Router>
  </div>

)

export default App;

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)