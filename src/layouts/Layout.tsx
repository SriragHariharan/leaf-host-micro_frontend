import React from 'react';
import { Outlet } from 'react-router';
import Topbar from '../components/Topbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100/80">
      <Topbar />
      <main className="min-h-screen px-2 pt-20 sm:px-4 md:px-6 md:pt-24 lg:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}