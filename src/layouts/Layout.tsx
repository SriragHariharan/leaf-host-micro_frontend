import React from 'react';
import { Outlet } from 'react-router';
// import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <Topbar />
      </div>
      <div className="flex">
        {/* <div className="hidden md:block w-64 fixed h-screen">
          <Sidebar />
        </div> */}
        <main className="flex-1 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}