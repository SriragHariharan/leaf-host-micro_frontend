import React from 'react';
import { Outlet } from 'react-router';
import Topbar from '../components/Topbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-ds-surface-page">
      <Topbar />
      <main className="min-h-screen px-ds-sm pt-20 sm:px-panel md:px-panel-lg md:pt-24 lg:px-section">
        <div className="mx-auto w-full max-w-dsContainer">
          <Outlet />
        </div>
      </main>
    </div>
  );
}