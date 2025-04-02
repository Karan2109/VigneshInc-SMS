import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { role } = useSelector((state) => state.auth);

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-indigo-50 text-indigo-700"
      : "text-gray-600 hover:bg-gray-50";
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            <Link
              to="/dashboard"
              className={`${isActive(
                "/dashboard"
              )} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              Dashboard
            </Link>
            <Link
              to="/students"
              className={`${isActive(
                "/students"
              )} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              Students
            </Link>
            {role === "admin" && (
              <Link
                to="/add-student"
                className={`${isActive(
                  "/add-student"
                )} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                Add Student
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
