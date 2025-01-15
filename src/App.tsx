import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router'; // Note: Ensure this is react-router-dom
import './index.scss';
import Layout from './layouts/Layout';

const ProfilePage = lazy(() => import('profileMF/ProfilePage'));
const GalleryPage = lazy(() => import('profileMF/GalleryPage'));
const AuthApp = lazy(() => import('authMF/AuthApp'));

const App = () => (
  <div>
    <Router>
      <Routes>
        {/* Auth route without sidebar */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading Auth...</div>}>
              <AuthApp />
            </Suspense>
          }
        />
        {/* Routes wrapped by Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<div className="text-6xl text-center">Feeds page</div>} />
          <Route path="/friends" element={<div className="text-6xl text-center">Friends page</div>} />
          <Route path="/groups" element={<div className="text-6xl text-center">Groups page</div>} />
          <Route path="/messages" element={<div className="text-6xl text-center">Messages page</div>} />
          <Route path="/postcards" element={<div className="text-6xl text-center">Postcards page</div>} />
          <Route path="/travel-ai" element={<div className="text-6xl text-center">AI page</div>} />
          <Route path="/notifications" element={<div className="text-6xl text-center">Notifications page</div>} />
          <Route path="/search" element={<div className="text-6xl text-center">Search page</div>} />
          {/* Profile page under Layout */}
          <Route
            path="/profile"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProfilePage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  </div>
);

export default App;

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
