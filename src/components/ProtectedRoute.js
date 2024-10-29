import React from "react";
import { Navigate } from "react-router-dom";
import { useGoogleOAuth } from "@react-oauth/google";

const ProtectedRoute = ({ children, login }) => {
  const token = localStorage.getItem("access_token"); // Check for token in localStorage

  // If user is not authenticated, render the login form
  if (!token) {
    return (
      <div>
        <h2>Please log in to access this content.</h2>
        <button onClick={login}>Sign in with Google 🚀</button>
      </div>
    );
  }

  // If user is authenticated, render the children (the protected route)
  return children;
};

export default ProtectedRoute;
