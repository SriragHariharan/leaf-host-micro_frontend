import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import './index.scss';
import Layout from './layouts/Layout';
import Login from './modfed-components/Login';
import Signup from './modfed-components/Signup';
import ValidateEmail from './modfed-components/ValidateEmail';
import ValidateOTP from './modfed-components/ValidateOtp';
import ResetPassword from './modfed-components/ResetPassword';
//import useStore from './helpers/globalStore';
import ProtectedRoute from './layouts/ProtectedRoute';

const ProfilePage = lazy(() => import('profileMF/ProfilePage'));
import useStore from "hostApp/GlobalStore";
import FriendPage from './modfed-components/FriendPage';
import FeedPage from './modfed-components/FeedPage';

// AuthRoute Component
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accessToken, refreshToken } = useStore();
  const isAuthenticated = accessToken || refreshToken;
  
  // If the user is authenticated, redirect to the home page
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

const App = () => {

  return (
    <div>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={<AuthRoute> <Login /> </AuthRoute> }
          />
          <Route
            path="/signup"
            element={ <AuthRoute> <Signup /> </AuthRoute> }
          />
          <Route
            path="/confirm-email"
            element={ <AuthRoute> <ValidateEmail /> </AuthRoute> }
          />
          <Route
            path="/confirm-otp"
            element={ <AuthRoute> <ValidateOTP /> </AuthRoute> }
          />
          <Route
            path="/reset-password"
            element={ <AuthRoute> <ResetPassword /> </AuthRoute> }
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<FeedPage />} />
              <Route path="/friends" element={ <FriendPage /> } />
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
                    <ProfilePage self={true} />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
