import React from 'react';
import { Outlet } from 'react-router';
import Topbar from '../components/Topbar';
import { designRecipes } from '@srirag/leaf-design-system';

export default function Layout() {
  return (
    <div className={designRecipes.pageShell}>
      <Topbar />
      <main className="min-h-screen px-ds-sm pt-20 sm:px-panel md:px-panel-lg md:pt-24 lg:px-section">
        <div className="mx-auto w-full max-w-dsContainer">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
