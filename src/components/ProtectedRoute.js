import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { checkTokenValidity } from "../services/googleAuth"; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("access_token"));

  const onSuccess = (credentialResponse) => {
    const accessToken = credentialResponse.credential;
    console.log("Credential Response:", credentialResponse);
    sessionStorage.setItem("access_token", accessToken);
    setToken(accessToken);
    console.log("Sign-in successful");
  };

  const onError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        const isValid = await checkTokenValidity(token);
        if (!isValid) {
          // Handle invalid token (e.g., log out the user)
          sessionStorage.removeItem("access_token");
          setToken(null);
        }
      }
    };
    validateToken();
  }, [token]);

  if (!token) {
    return (
      <div>
        <h2>Please log in to access this content.</h2>
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
