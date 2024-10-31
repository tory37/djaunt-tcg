import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./styles/App.css";
import Home from "./components/Home";
import AppWrapper from "./components/AppWrapper";
import CardGameContainer from "./components/CardGameContainer";
// import ProtectedRoute from "./components/ProtectedRoute";

import "./styles/General.css";
import "./styles/View.css";
import "./styles/Card.css";
import "./styles/ViewSelector.css";
import "./styles/MidView.css";
import "./styles/ListView.css";
import "./styles/RandomImages.css";
import "./styles/Button.css";
import "./styles/Icons.css";

const DIGIMON_SHEETS_ID = "1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk";
const DIGIMON_MASTER_SHEET_ID = "1592992967";

const UNION_ARENA_SHEETS_ID = "1do5sQxfulsowv_QdIvMzwZ9OrjxpS0hYkTRMxTFg7NQ";
const UNION_ARENA_MASTER_SHEET_ID = "1016706041";

const App = () => {
  return (
    <div className="App">
      <AppWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/digimon"
            element={
              // <ProtectedRoute>
              <CardGameContainer
                key="digimon"
                sheetsId={DIGIMON_SHEETS_ID}
                directorySheetId={DIGIMON_MASTER_SHEET_ID}
                getImageUrl={(cardNumber) => {
                  return `https://images.digimoncard.io/images/cards/${cardNumber}.jpg`;
                }}
              />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/union-arena"
            element={
              // <ProtectedRoute>
              <CardGameContainer
                key="union-arena"
                sheetsId={UNION_ARENA_SHEETS_ID}
                directorySheetId={UNION_ARENA_MASTER_SHEET_ID}
                getImageUrl={(cardNumber) => {
                  return `https://www.unionarena-tcg.com/na/images/cardlist/card/${cardNumber}.png`;
                }}
                route="union-arena"
              />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </AppWrapper>
    </div>
  );
};

export default App;
