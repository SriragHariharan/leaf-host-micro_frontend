import React from 'react';
import { Link, NavLink } from 'react-router';
import { 
  Home, Users, Group, MessageSquare, 
  Map, Sparkles, Bell, Search, Leaf, LogOut 
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { icon: Home, label: 'Feed', to: '/' },
  { icon: Users, label: 'Friends', to: '/friends' },
  { icon: Group, label: 'Groups', to: '/groups' },
  { icon: MessageSquare, label: 'Messages', to: '/messages' },
  { icon: Map, label: 'Postcards', to: '/postcards' },
  { icon: Sparkles, label: 'Travel AI', to: '/travel-ai' },
  { icon: Bell, label: 'Notifications', to: '/notifications' },
  { icon: Search, label: 'Search', to: '/search' },
];

export default function Sidebar() {
  const username = "John Doe"; // Replace with dynamic user data
  const profilePicUrl = "https://via.placeholder.com/40"; // Replace with dynamic profile picture URL

  return (
    <div className="h-full bg-white border-r border-gray-200 p-4 flex flex-col justify-between left-0 z-50">
      {/* Top Section */}
      <div>

        <div className="flex items-center gap-2 mb-8">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-xl font-semibold text-green-600">Leaf</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                  'hover:bg-green-50 hover:text-green-600',
                  isActive ? 'bg-green-50 text-green-600' : 'text-gray-700'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <img
            src={profilePicUrl}
            alt={`${username}'s profile`}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{username}</p>
            <Link to="/profile" className="text-xs text-gray-500">View Profile</Link>
          </div>
        </div>
        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
          onClick={() => {
            // Add logout functionality here
            console.log("Logout clicked");
          }}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
