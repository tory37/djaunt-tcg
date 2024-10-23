import React from "react";
import "../styles/Home.css";

// const games = [
//   { name: 'Digimon', path: '/digimon?view=full', logo: 'https://i.ytimg.com/vi/ghZYuIi5mu4/mqdefault.jpg' },
//   { name: 'Pokemon', path: '/pokemon', logo: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/_tiles/tcg_product_gallery_169_en.jpg' },
//   { name: 'MTG', path: '/mtg', logo: 'https://media.wizards.com/2017/images/daily/41mztsnrdm.jpg' },
//   { name: 'VTES', path: '/vtes', logo: 'https://steamusercontent-a.akamaihd.net/ugc/709653592633754854/F56857243FB4E058EFB3F55C18BE585EFF53EEA2/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true' },
//   { name: 'Lorcana', path: '/lorcana', logo: 'https://eu-images.contentstack.com/v3/assets/blt8770191dea35bccc/blt7b6bca8bd82cdc48/64d3ec28ef49e088a3a43a82/Disney_Lorcana.png' },
// ];

const Home = () => {
  return (
    <div className="home-container">
      {/* {games.map((game) => (
        <Link to={game.path} key={game.name} className="game-button">
          <img src={game.logo} alt={`${game.name} logo`} className="game-logo" />
        </Link>
      ))} */}
      <div className="game-button">
        Welcome. Please select a game to continue.
      </div>
    </div>
  );
};

export default Home;
