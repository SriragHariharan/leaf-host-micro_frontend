import React from 'react';
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

import useStore from "hostApp/GlobalStore";
import FriendPage from './modfed-components/FriendPage';
import FeedPage from './modfed-components/FeedPage';
import ProfilePage from './modfed-components/ProfilePage';
import SharedPostPage from './modfed-components/SharedPostPage';
import SearchPostsPage from './modfed-components/SearchPostsPage';
import ChatPage from './modfed-components/ChatPage';
import ConversationsPage from './modfed-components/ConversationsPage';

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

          {/* shared post route */}
          <Route
            path="/post"
            element={ <SharedPostPage /> }
          />


          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<FeedPage />} />
              <Route path="/friends" element={ <FriendPage /> } />
              <Route path="/groups" element={<div className="text-6xl text-center">Groups page</div>} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/messages" element={<ConversationsPage />} />
              <Route path="/postcards" element={<div className="text-6xl text-center">Postcards page</div>} />
              <Route path="/travel-ai" element={<div className="text-6xl text-center">AI page</div>} />
              <Route path="/notifications" element={<div className="text-6xl text-center">Notifications page</div>} />
              <Route path="/search" element={<SearchPostsPage />} />
              <Route path="/view-profile/:userID" element={<ProfilePage self={false} />} />
              {/* Profile page under Layout */}
              <Route path="/profile" element={<ProfilePage self={true} />} />
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
