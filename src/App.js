import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './styles/App.css';
import Password from './components/Password';
import Home from './components/Home';
import Digimon from './components/Digimon';
import { isLoggedIn, logout } from './services/auth';

function App() {
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const location = useLocation();

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/digimon" element={<Digimon location={location} />} />
          {/* Add other routes here */}
        </Routes>
      ) : (
        <Password onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;