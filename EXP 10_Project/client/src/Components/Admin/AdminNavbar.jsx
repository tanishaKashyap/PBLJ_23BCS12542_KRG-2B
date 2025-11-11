import React from "react";
import { assets } from "../../assets/assets";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300/20 bg-black text-white">
      {/* Logo on the left */}
      <div className="flex items-center gap-3">
        <img src={assets.logo} alt="Logo" className="w-28 md:w-32 h-auto" />
      </div>

      {/* You can add profile info or other items here later */}
      {/* <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">Welcome, Admin</span>
      </div> */}
    </div>
  );
};

export default AdminNavbar;
