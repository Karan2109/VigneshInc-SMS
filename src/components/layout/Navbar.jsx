import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">
                Student Management
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.name} ({role})
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
