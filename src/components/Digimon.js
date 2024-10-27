import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import axios from "axios";

import "../styles/Digimon.css";
import DeckSelector from "./DeckSelector";
import DeckDisplay from "./DeckDisplay";
import { useLocation, useNavigate } from "react-router";

const DIGIMON_SHEETS_ID = "1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk";
const DIGIMON_MASTER_SHEET_ID = "1592992967";

const Digimon = () => {
  const [masterList, setMasterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
  };

  const getImageUrl = (cardNumber) => {
    return `https://images.digimoncard.io/images/cards/${cardNumber}.jpg`;
  };

  useEffect(() => {
    const fetchMasterList = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${DIGIMON_SHEETS_ID}/pub?gid=${DIGIMON_MASTER_SHEET_ID}&single=true&output=csv`;
        const response = await axios.get(url);
        console.log("Master List fetched successfully:", response.data);

        Papa.parse(response.data, {
          header: true,
          complete: async (results) => {
            console.log("CSV parsing complete. Parsed data:", results.data);
            setMasterList(results.data);

            const params = new URLSearchParams(location.search);
            const deckId = params.get("deckId");

            if (deckId) {
              const deckFromParams = results.data.find(
                (deck) => deck.Id === deckId
              );
              setSelectedDeck(deckFromParams);
            } else {
              navigate("/digimon");
            }
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
          sheetsId={DIGIMON_SHEETS_ID}
          getImageUrl={getImageUrl}
          deckImage={selectedDeck.Image}
          drawCount={5}
        />
      )}
    </>
  );
};

export default Digimon;
