import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboardIcon,
  PlusSquareIcon,
  ListIcon,
  ListCollapseIcon,
} from "lucide-react";
import { assets } from "../../assets/assets";

const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 
     hover:bg-red-600/20 hover:text-red-500 
     ${isActive ? "bg-red-600/20 text-red-500" : ""}`;

  return (
    <div className="flex flex-col h-full bg-gray-950 text-gray-300">
      {/* Admin User Info */}
      <div className="flex flex-col items-center py-6 border-b border-gray-800">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-12 h-12 rounded-full mb-2 border border-gray-700"
        />
        <p className="text-sm font-semibold">{`${user.firstName} ${user.lastName}`}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-5 space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <LayoutDashboardIcon size={18} />
          <span className="text-sm font-medium">Dashboard</span>
        </NavLink>

        <NavLink to="/admin/add-shows" className={linkClass}>
          <PlusSquareIcon size={18} />
          <span className="text-sm font-medium">Add Shows</span>
        </NavLink>

        <NavLink to="/admin/list-shows" className={linkClass}>
          <ListIcon size={18} />
          <span className="text-sm font-medium">List Shows</span>
        </NavLink>

        <NavLink to="/admin/list-bookings" className={linkClass}>
          <ListCollapseIcon size={18} />
          <span className="text-sm font-medium">List Bookings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
