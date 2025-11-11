import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../Components/Admin/AdminNavbar';
import AdminSidebar from '../../Components/Admin/AdminSidebar';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-20 md:w-60 border-r border-gray-300/20">
          <AdminSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 px-4 py-6 md:px-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
