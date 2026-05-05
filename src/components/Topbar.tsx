import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router'; // Make sure to use 'react-router-dom' for React Router v6
import { Home, Users, MessageSquare, Bell, Search, Leaf } from 'lucide-react';
import useStore from "hostApp/GlobalStore";
import useAxiosInstance from 'profileMF/useAxiosInstance';
import io from 'socket.io-client';
// import { NOTIFICATION_SERVICE_URL } from '../constants/constants';
import useNotificationStore from '../helpers/notificationCountStore';


export default function Topbar() {
  const { username, profilePic, accessToken } = useStore();
  const { notificationsCount, friendRequestsCount, increaseNotificationsCount, setNotificationsCount } = useNotificationStore();

  const axiosInstance = useAxiosInstance();
  
  const navItems = [
    { icon: Home, label: 'Feed', to: '/', count: 0 },
    { icon: Users, label: 'Friends', to: '/friends', count: friendRequestsCount },
    // { icon: MessageSquare, label: 'Messages', to: '/messages', count: 0 },
    { icon: Search, label: 'Search', to: '/search', count: 0 },
    { icon: Bell, label: 'Notifications', to: '/notifications', count: notificationsCount },
  ];

  /* connecting via notification socket */
  /*
    const NOTIFICATION_SERVICE_URL = process.env.VITE_NOTIFICATION_SERVICE_URL;
    const notificationSocket = io(NOTIFICATION_SERVICE_URL, { transports: ["websocket"] });


    useEffect(() => {
      notificationSocket.on('connect', () => {
        console.log(`Connected to Notification Service at ${NOTIFICATION_SERVICE_URL}`);
        notificationSocket.emit('authenticate', { token: accessToken });

        // Listen for the 'friend_request_received' event
        notificationSocket.on('friend_request_received', (_data) => {
          increaseFriendRequestsCount();
          increaseNotificationsCount();
        });

        // Listen for post notification
        notificationSocket.on('post_notification', (_data) => {
          increaseNotificationsCount();
        });
      });

      return () => {
        notificationSocket.disconnect();
      };
    }, [accessToken, increaseFriendRequestsCount, increaseNotificationsCount]);  
  */

    //get unread notifications count using api polling
    //REASON: this is not the best way to do this, but it works for now also notifications is not that important compared to feeds
    useEffect(() => {
      const interval = setInterval(() => {
        axiosInstance.get("../notification/count")
        .then(resp => {
          setNotificationsCount(resp?.data?.data?.count)
        })
        .catch(err => console.log(err));
      }, 1500);

      return () => clearInterval(interval);
    }, [accessToken]);

  return (
    <div className="bg-white border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 h-16">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-600 inline" />
            <span className="text-xl font-semibold text-green-600 hidden sm:inline">Leaf</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative flex items-center justify-center gap-2 p-2 rounded-lg transition-all
                  hover:bg-green-50 hover:scale-105
                  ${isActive ? 'text-green-600 bg-green-50 shadow-sm' : 'text-gray-600'}`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="hidden sm:inline text-sm font-medium">{item.label}</span>
                {item.count > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full border-2 border-white">
                    {item.count}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center">
            <NavLink to="/profile" className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg transition-all hover:bg-green-50
              ${isActive ? 'text-green-600 bg-green-50 shadow-sm' : 'text-gray-600'}`
            }>
              <div className="relative">
                <img
                  src={profilePic ?? process.env.VITE_DEFAULT_PROFILE_IMAGE}
                  alt="Profile"
                  loading='lazy'
                  className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="hidden sm:inline text-sm font-extrabold">{username}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}