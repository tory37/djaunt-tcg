import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

console.log("Google Client ID:", CLIENT_ID); // Log the client ID to check if it's being read

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
