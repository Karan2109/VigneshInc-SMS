import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ roles }) => {
//   const { isAuthenticated, role } = useSelector((state) => state.auth);

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   if (roles && !roles.includes(role)) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// };

const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
