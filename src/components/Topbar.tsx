import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router'; // Make sure to use 'react-router-dom' for React Router v6
import { Home, Users, Bell, Search, Leaf } from 'lucide-react';
import useStore from "hostApp/GlobalStore";
import useAxiosInstance from 'profileMF/useAxiosInstance';
// import { NOTIFICATION_SERVICE_URL } from '../constants/constants';
import useNotificationStore from '../helpers/notificationCountStore';


export default function Topbar() {
  const { username, profilePic, accessToken } = useStore();
  const { notificationsCount, friendRequestsCount, setNotificationsCount } = useNotificationStore();

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
        .then((resp: { data?: { data?: { count?: number } } }) => {
          setNotificationsCount(resp?.data?.data?.count ?? 0)
        })
        .catch((err: unknown) => console.log(err));
      }, 1500);

      return () => clearInterval(interval);
    }, [accessToken]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1320px] px-3 py-2.5 md:px-5">
        <div className="flex h-14 items-center justify-between gap-2 rounded-2xl border border-slate-200/70 bg-white/90 px-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:h-16 md:px-3.5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1 transition-all duration-200 hover:bg-emerald-50/80"
          >
            <Leaf className="h-5 w-5 text-emerald-600 md:h-5.5 md:w-5.5" />
            <span className="text-sm font-semibold tracking-tight text-emerald-700 md:text-base">Leaf</span>
          </Link>
          <nav className="flex items-center gap-1.5 md:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-xl border px-2 transition-all duration-200 md:h-10 md:px-3
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50
                  ${isActive
                    ? 'border-emerald-200 bg-emerald-50/90 text-emerald-700 shadow-[0_6px_14px_rgba(16,185,129,0.2)]'
                    : 'border-transparent text-slate-600 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:text-slate-900 hover:shadow-sm'
                  }`
                }
              >
                <item.icon className="h-[18px] w-[18px]" />
                <span className="max-md:hidden text-xs font-medium">{item.label}</span>
                {item.count > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full border border-white bg-rose-500 px-1 text-[10px] font-semibold leading-none text-white shadow-sm">
                    {item.count}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-xl border p-1 transition-all duration-200 md:gap-2.5 md:px-1.5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50
                ${isActive
                  ? 'border-emerald-200 bg-emerald-50/90 shadow-[0_6px_14px_rgba(16,185,129,0.18)]'
                  : 'border-transparent hover:border-slate-200 hover:bg-white hover:shadow-sm'
                }`
              }
            >
              <div className="relative shrink-0">
                <img
                  src={profilePic ?? process.env.VITE_DEFAULT_PROFILE_IMAGE}
                  alt="Profile"
                  loading='lazy'
                  className="h-7 w-7 rounded-full border border-white object-cover shadow-sm md:h-8 md:w-8"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white bg-emerald-500"></div>
              </div>
              <span className="max-sm:hidden max-w-28 truncate text-xs font-semibold text-slate-700">{username}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}