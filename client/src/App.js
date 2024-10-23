import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Password from './components/auth/Password';
import Home from './components/home/Home';
import Decks from './components/deck/Decks';
import { isLoggedIn, logout } from './services/auth';
import Layout from './components/common/Layout';
import CardCreator from './components/card/CardCreator';

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
        <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/decks" element={<Decks />} />
              <Route path="/cards" element={<CardCreator />} />
              {/* Add the Cards route when the component is created */}
              {/* <Route path="cards" element={<Cards />} /> */}
            </Routes>
        </Layout>
      ) : (
        <Password onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;