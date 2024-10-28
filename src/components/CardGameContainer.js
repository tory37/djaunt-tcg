import React, { useEffect, useState, useRef } from "react";
import Papa from "papaparse";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import DeckSelector from "./DeckSelector";
import DeckDisplay from "./DeckDisplay";

const CardGameContainer = ({
  sheetsId,
  directorySheetId,
  route,
  getImageUrl,
  isAuthenticated,
}) => {
  const [masterList, setMasterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const prevSheetsId = useRef(sheetsId);
  const prevDirectorySheetId = useRef(directorySheetId);

  // Load saved state from localStorage
  useEffect(() => {
    const savedDeck = localStorage.getItem("selectedDeck");
    if (savedDeck) {
      setSelectedDeck(JSON.parse(savedDeck));
    }
  }, []);

  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
    // Save selected deck to localStorage
    localStorage.setItem("selectedDeck", JSON.stringify(deck));
  };

  useEffect(() => {
    if (
      prevSheetsId.current === sheetsId &&
      prevDirectorySheetId.current === directorySheetId
    ) {
      return;
    }

    const fetchMasterList = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${sheetsId}/pub?gid=${directorySheetId}&single=true&output=csv`;
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
              navigate(`/${route}`);
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

    prevSheetsId.current = sheetsId;
    prevDirectorySheetId.current = directorySheetId;
  }, [sheetsId, directorySheetId, location, navigate]);

  return (
    <>
      {loading && <div className="loading-overlay">Loading...</div>}
      <DeckSelector onSelectDeck={handleSelectDeck} decks={masterList} />
      {selectedDeck && (
        <DeckDisplay
          deckName={selectedDeck.Name}
          deckId={selectedDeck.Id}
          sheetsId={sheetsId}
          getImageUrl={getImageUrl}
          deckImage={selectedDeck.Image}
          drawCount={5}
          isAuthenticated={isAuthenticated}
        />
      )}
    </>
  );
};

export default CardGameContainer;
