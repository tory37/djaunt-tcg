const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

let tokenClient;
let gapiInitialized = false;

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

export const initGoogleServices = async () => {
  try {
    await loadScript("https://apis.google.com/js/api.js");
    await new Promise((resolve, reject) => {
      window.gapi.load("client", { callback: resolve, onerror: reject });
    });
    await window.gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
    });
    gapiInitialized = true;

    await loadScript("https://accounts.google.com/gsi/client");
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (resp) => {
        if (resp.error !== undefined) {
          console.error("Error during token request:", resp);
        } else {
          window.localStorage.setItem("google_access_token", resp.access_token);
          window.gapi.client.setToken({ access_token: resp.access_token });
        }
      },
    });

    // Check if a token is already stored
    const storedToken = window.localStorage.getItem("google_access_token");
    if (storedToken) {
      window.gapi.client.setToken({ access_token: storedToken });
    }

    return true;
  } catch (error) {
    console.error("Error initializing Google services", error);
    return false;
  }
};

export const signIn = () => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error("Token client not initialized"));
      return;
    }
    tokenClient.callback = (resp) => {
      if (resp.error !== undefined) {
        reject(resp);
      } else {
        window.localStorage.setItem("google_access_token", resp.access_token);
        window.gapi.client.setToken({ access_token: resp.access_token });
        resolve(resp);
      }
    };
    tokenClient.requestAccessToken({ prompt: "consent" });
  });
};

export const signOut = () => {
  const token = window.gapi.client.getToken();
  if (token !== null) {
    window.google.accounts.oauth2.revoke(token.access_token);
    window.gapi.client.setToken("");
    window.localStorage.removeItem("google_access_token");
  }
};

export const isSignedIn = () => {
  return window.gapi.client.getToken() !== null;
};

export const readFromSheet = async (spreadsheetId, range) => {
  if (!gapiInitialized) {
    throw new Error("Google API client not initialized");
  }
  try {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });
    return response.result.values;
  } catch (error) {
    console.error("Error reading from Google Sheet:", error);
    throw error;
  }
};

export const writeToSheet = async (spreadsheetId, range, values) => {
  if (!gapiInitialized) {
    throw new Error("Google API client not initialized");
  }
  try {
    await window.gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: "USER_ENTERED",
      resource: { values: values },
    });
  } catch (error) {
    console.error("Error writing to Google Sheet:", error);
    throw error;
  }
};
