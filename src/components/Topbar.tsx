import React from 'react';
import { Link, NavLink } from 'react-router';
import { 
  Home, Users, MessageSquare, Map, 
  Bell, Search, Leaf,
} from 'lucide-react';

import useStore from "hostApp/GlobalStore";

const navItems = [
  { icon: Home, label: 'Feed', to: '/', count: 0 },
  { icon: Users, label: 'Friends', to: '/friends', count: 3 },
  { icon: MessageSquare, label: 'Messages', to: '/messages', count: 5 },
  // { icon: Group, label: 'Groups', to: '/groups', count: 2 },
  // { icon: Map, label: 'Postcards', to: '/postcards', count: 2 },
  // { icon: Sparkles, label: 'Travel AI', to: '/travel-ai', count: 0 },
  { icon: Bell, label: 'Notifications', to: '/notifications', count: 8 },
  { icon: Search, label: 'Search', to: '/search', count: 0 },
];

export default function Topbar() {
  const { username, profilePic } = useStore();
  return (
    <div className="bg-white border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo section */}
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-600 inline" />
            <span className="text-xl font-semibold text-green-600 hidden sm:inline">Leaf</span>
          </Link>
          
          {/* Center section - Navigation */}
          <nav className="flex items-center gap-2 sm:gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative flex items-center justify-center gap-2 p-2 rounded-lg transition-all
                  hover:bg-green-50 hover:scale-105
                  ${isActive 
                    ? 'text-green-600 bg-green-50 shadow-sm' 
                    : 'text-gray-600'}`
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

          {/* Profile section */}
          <div className="flex items-center">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg transition-all hover:bg-green-50
                ${isActive ? 'text-green-600 bg-green-50 shadow-sm' : 'text-gray-600'}`
              }
            >
              <div className="relative">
                <img
                  src={
                    profilePic === null || profilePic === "null"
                      ? "https://leaf-user-profile-pics.s3.us-east-1.amazonaws.com/default-avatar.jpg"
                      : profilePic
                  }
                  alt="Profile"
                  loading='lazy'
                  className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
                {/* <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div> */}
              </div>
              <span className="hidden sm:inline text-sm font-extrabold">{username}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}