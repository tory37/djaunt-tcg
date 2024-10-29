const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

let tokenClient;
let gapiInitialized = false;

const loadGapiClient = () => {
  return new Promise((resolve, reject) => {
    if (window.gapi) {
      window.gapi.load("client", { callback: resolve, onerror: reject });
    } else {
      reject(new Error("GAPI not loaded"));
    }
  });
};

// Modify the signIn function to request a refresh token
export const signIn = () => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error("Token client not initialized"));
      return;
    }
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

export const readFromSheet = async (spreadsheetId, range) => {
  if (!gapiInitialized) {
    throw new Error("Google API client not initialized");
  }

  // Check if the user is signed in
  if (!isSignedIn()) {
    throw new Error("User is not signed in");
  }

  try {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });
    return response.result.values;
  } catch (error) {
    console.error(
      `Error reading from Google Sheet (${spreadsheetId}, ${range}):`,
      error
    );
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

export const initGoogleServices = async () => {
  try {
    await loadGapiClient();
    await window.gapi.client.init({
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest",
      ],
    });
    gapiInitialized = true;

    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      callback: (resp) => {
        if (resp.error !== undefined) {
          console.error("Error during token request:", resp);
        } else {
          window.localStorage.setItem("google_access_token", resp.access_token);
          window.gapi.client.setToken({ access_token: resp.access_token });
        }
      },
    });

    return true;
  } catch (error) {
    console.error("Error initializing Google services", error);
    return false;
  }
};

export const isSignedIn = () => {
  return window.gapi.client.getToken() !== null;
};

// Ensure this is called before any other Google API calls
initGoogleServices();
