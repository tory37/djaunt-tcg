import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import axios from "axios";

import "../styles/Digimon.css";
import DeckSelector from "./DeckSelector";
import DeckDisplay from "./DeckDisplay";

const UNION_ARENA_SHEETS_ID = "1do5sQxfulsowv_QdIvMzwZ9OrjxpS0hYkTRMxTFg7NQ";
const UNION_ARENA_MASTER_SHEET_ID = "1016706041";

const UnionArena = () => {
  const [masterList, setMasterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);

  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
  };

  const getImageUrl = (cardNumber) => {
    return `https://www.unionarena-tcg.com/na/images/cardlist/card/${cardNumber}.png`;
  };

  useEffect(() => {
    const fetchMasterList = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${UNION_ARENA_SHEETS_ID}/pub?gid=${UNION_ARENA_MASTER_SHEET_ID}&single=true&output=csv`;
        const response = await axios.get(url);
        console.log("Master List fetched successfully:", response.data);

        Papa.parse(response.data, {
          header: true,
          complete: async (results) => {
            console.log("CSV parsing complete. Parsed data:", results.data);
            setMasterList(results.data);
          },
          error: (err) => {
            console.error("Error parsing CSV data:", err);
            setLoading(false);
          },
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchMasterList();
  }, []);

  return (
    <>
      <DeckSelector onSelectDeck={handleSelectDeck} decks={masterList} />
      {selectedDeck && (
        <DeckDisplay
          deckName={selectedDeck.Name}
          deckId={selectedDeck.Id}
          sheetsId={UNION_ARENA_SHEETS_ID}
          getImageUrl={getImageUrl}
          deckImage={selectedDeck.Image}
        />
      )}
    </>
  );
};

export default UnionArena;
