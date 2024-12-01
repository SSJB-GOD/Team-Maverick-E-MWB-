import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("userLoggedIn");

  // If not authenticated, redirect to the login page
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
