import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/App.css";
import Password from "./components/Password";
import Home from "./components/Home";
import Digimon from "./components/Digimon";
import AppWrapper from "./components/AppWrapper";
import { isLoggedIn, logout } from "./services/auth";
import UnionArena from "./components/UnionArena";

import "./styles/General.css";
import "./styles/View.css";
import "./styles/Card.css";
import "./styles/ViewSelector.css";
import "./styles/MidView.css";
import "./styles/ListView.css";
import "./styles/RandomImages.css";
import "./styles/Button.css";
import "./styles/Icons.css";

function App() {
  const [isLoggedInState, setIsLoggedInState] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      setIsLoggedInState(true);
    } else {
      logout();
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedInState(true);
  };

  return (
    <div className="App">
      {isLoggedInState ? (
        <AppWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/digimon" element={<Digimon />} />
            <Route path="/union-arena" element={<UnionArena />} />
          </Routes>
        </AppWrapper>
      ) : (
        <Password onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
