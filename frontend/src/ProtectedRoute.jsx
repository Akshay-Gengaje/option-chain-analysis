
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("upstox_access_token"); // Check for access token

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
