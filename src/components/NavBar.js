import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link
        to={"/digimon?view=full"}
        key={"digimon-nav-button"}
        className="navbar-section"
      >
        <img
          src="https://images.withthewill.net/digimoncardgame_0logo_january20_2020.png"
          alt="Digimon"
          className="navbar-logo"
        />
      </Link>
      <Link
        to={"/union-arena?view=full"}
        key={"union-arena-nav-button"}
        className="navbar-section"
      >
        <img
          src="https://i0.wp.com/everscapeonline.com/wp-content/uploads/2024/08/Union-Arena-Logo.png?fit=265%2C130&ssl=1"
          alt="Union Arena"
          className="navbar-logo"
        />
      </Link>
      <Link
        to={"/pokemon?view=full"}
        key={"pokemon-nav-button"}
        className="navbar-section"
      >
        <img
          src="https://cdn2.steamgriddb.com/logo_thumb/4049f46696d549c65f5832e15664afdd.png"
          alt="Pokemon"
          className="navbar-logo"
        />
      </Link>
    </nav>
  );
};

export default NavBar;
