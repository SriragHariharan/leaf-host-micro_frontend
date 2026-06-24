import React from 'react';
import { Link, NavLink } from 'react-router';
import { Home, Users, Bell, Search, Leaf } from 'lucide-react';
import useStore from "hostApp/GlobalStore";
import useNotificationStore from '../helpers/notificationCountStore';
import { designRecipes } from '@srirag/leaf-design-system';


export default function Topbar() {
  const { username, profilePic } = useStore();
  const { notificationsCount, friendRequestsCount } = useNotificationStore();

  const navItems = [
    { icon: Home, label: 'Feed', to: '/', count: 0 },
    { icon: Users, label: 'Friends', to: '/friends', count: friendRequestsCount },
    { icon: Search, label: 'Search', to: '/search', count: 0 },
    { icon: Bell, label: 'Notifications', to: '/notifications', count: notificationsCount },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-dsOverlay">
      <div className="mx-auto max-w-dsContainerWide px-ds-sm py-ds-sm md:px-panel">
        <div className={`${designRecipes.topbarShell} flex min-h-dsTopbar items-center justify-between gap-ds-sm px-ds-sm md:min-h-dsTopbarMd md:px-control-x`}>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-dsMd px-ds-sm py-1 transition-all duration-ds hover:bg-ds-brand-50"
          >
            <Leaf className="h-5 w-5 text-ds-brand-600" />
            <span className="text-sm font-semibold tracking-tight text-ds-brand-700 md:text-base">Leaf</span>
          </Link>
          <nav className="flex items-center gap-1.5 md:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${designRecipes.navItemBase} h-9 min-w-9 md:h-10
                  ${isActive
                    ? designRecipes.navItemActive
                    : designRecipes.navItemIdle
                  }`
                }
              >
                <item.icon className="h-[18px] w-[18px]" />
                <span className="max-md:hidden text-xs font-medium">{item.label}</span>
                {item.count > 0 && (
                  <span className={`${designRecipes.badgeDanger} absolute -right-1 -top-1 h-[18px] min-w-[18px]`}>
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
                `inline-flex items-center gap-2 rounded-dsMd border p-1 transition-all duration-ds md:gap-2.5 md:px-1.5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-brand-500/50
                ${isActive
                  ? 'border-ds-brand-200 bg-ds-brand-50 shadow-dsBrand'
                  : 'border-transparent hover:border-ds-border-subtle hover:bg-ds-surface-card hover:shadow-dsSm'
                }`
              }
            >
              <div className="relative shrink-0">
                <img
                  src={profilePic ?? process.env.REACT_APP_DEFAULT_PROFILE_IMAGE}
                  alt="Profile"
                  loading='lazy'
                  className="h-7 w-7 rounded-full border border-ds-surface-card object-cover shadow-dsSm md:h-8 md:w-8"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-ds-surface-card bg-ds-state-success"></div>
              </div>
              <span className="max-sm:hidden max-w-28 truncate text-xs font-semibold text-ds-text-secondary">{username}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
