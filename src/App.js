import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./components/Home";
import AppWrapper from "./components/AppWrapper";
import {
  initGoogleServices,
  isSignedIn,
  signIn,
  signOut,
} from "./services/googleSheetsService";

import "./styles/General.css";
import "./styles/View.css";
import "./styles/Card.css";
import "./styles/ViewSelector.css";
import "./styles/MidView.css";
import "./styles/ListView.css";
import "./styles/RandomImages.css";
import "./styles/Button.css";
import "./styles/Icons.css";
import CardGameContainer from "./components/CardGameContainer";

const DIGIMON_SHEETS_ID = "1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk";
const DIGIMON_MASTER_SHEET_ID = "1592992967";

const UNION_ARENA_SHEETS_ID = "1do5sQxfulsowv_QdIvMzwZ9OrjxpS0hYkTRMxTFg7NQ";
const UNION_ARENA_MASTER_SHEET_ID = "1016706041";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const initialized = await initGoogleServices();
        setIsInitialized(initialized);
        if (initialized) {
          setIsAuthenticated(isSignedIn());
        }
      } catch (error) {
        console.error("Error initializing Google services:", error);
        setError("Error initializing Google services");
      }
    };
    init();
  }, []);

  const handleSignIn = async () => {
    if (!isInitialized) {
      setError("Google services not initialized yet. Please try again.");
      return;
    }
    try {
      await signIn();
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Error signing in. Please try again.");
    }
  };

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <div>
          <button onClick={handleSignIn}>Sign In with Google</button>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <AppWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/digimon"
              element={
                <CardGameContainer
                  sheetsId={DIGIMON_SHEETS_ID}
                  directorySheetId={DIGIMON_MASTER_SHEET_ID}
                  getImageUrl={(cardNumber) => {
                    return `https://images.digimoncard.io/images/cards/${cardNumber}.jpg`;
                  }}
                  route="digimon"
                  isAuthenticated={isAuthenticated}
                  handleSignOut={handleSignOut}
                />
              }
            />
            <Route
              path="/union-arena"
              element={
                <CardGameContainer
                  sheetsId={UNION_ARENA_SHEETS_ID}
                  directorySheetId={UNION_ARENA_MASTER_SHEET_ID}
                  getImageUrl={(cardNumber) => {
                    return `https://www.unionarena-tcg.com/na/images/cardlist/card/${cardNumber}.png`;
                  }}
                  route="union-arena"
                  isAuthenticated={isAuthenticated}
                  handleSignOut={handleSignOut}
                />
              }
            />
          </Routes>
        </AppWrapper>
      )}
    </div>
  );
}

export default App;
