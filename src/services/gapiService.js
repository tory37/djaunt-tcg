const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID; // Your client ID
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; // Your API key
const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

export const loadGapi = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    document.body.appendChild(script);
  });
};

export const authenticateGapi = () => {
  return window.gapi.auth2.getAuthInstance().signIn();
};

export const refreshAccessToken = async () => {
  const refreshToken = sessionStorage.getItem("refresh_token");
  const response = await fetch(`https://oauth2.googleapis.com/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await response.json();
  sessionStorage.setItem("access_token", data.access_token); // Update the access token
  return data.access_token;
};
