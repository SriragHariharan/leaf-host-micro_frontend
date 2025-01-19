import React from 'react';
import { NavLink } from 'react-router';
import { 
  Home, Users, MessageSquare, Map, 
  Bell, Search, Leaf, Group,
  Sparkles
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Feed', to: '/', count: 0 },
  { icon: Users, label: 'Friends', to: '/friends', count: 3 },
  // { icon: Group, label: 'Groups', to: '/groups', count: 2 },
  { icon: MessageSquare, label: 'Messages', to: '/messages', count: 5 },
  { icon: Map, label: 'Postcards', to: '/postcards', count: 2 },
  // { icon: Sparkles, label: 'Travel AI', to: '/travel-ai', count: 0 },
  { icon: Bell, label: 'Notifications', to: '/notifications', count: 8 },
  { icon: Search, label: 'Search', to: '/search', count: 0 },
];

export default function Topbar() {
  return (
    <div className="bg-white border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo section */}
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-600 inline" />
            <span className="text-xl font-semibold text-green-600 hidden md:inline">Leaf</span>
          </div>
          
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
                <span className="hidden lg:inline text-sm font-medium">{item.label}</span>
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
                `flex items-center gap-2 p-2 rounded-lg transition-all hover:bg-green-50 hover:scale-105
                ${isActive ? 'text-green-600 bg-green-50 shadow-sm' : 'text-gray-600'}`
              }
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=30"
                  alt="Profile"
                  className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="hidden lg:inline text-sm font-medium">Sarah Anderson</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}