import React, { useEffect, useState, useRef, useCallback } from "react";
import Papa from "papaparse";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import DeckSelector from "./DeckSelector";
import DeckDisplay from "./DeckDisplay";
import { readFromSheet, writeToSheet } from "../services/googleSheetsService";
import ImportPopup from "./ImportPopup";

const CardGameContainer = ({
  sheetsId,
  directorySheetId,
  getImageUrl,
  passphrase,
  handleLogout,
}) => {
  const [masterList, setMasterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [importedDeck, setImportedDeck] = useState([]);
  const [showImportPopup, setShowImportPopup] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [deckData, setDeckData] = useState([]);

  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
    localStorage.setItem("selectedDeck", JSON.stringify(deck));
  };

  const handleImportDeck = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const deckLines = text
        .split("\n")
        .filter((line) => line.trim() !== "" && !line.startsWith("//"));
      const parsedDeck = deckLines.map((line) => {
        const parts = line.split(" ");
        const number = parts[0];
        const total = parts[parts.length - 1];
        const name = parts.slice(1, -1).join(" ");
        const image = getImageUrl(number);
        return { Number: number, Name: name, Total: total, Image: image };
      });
      setImportedDeck(parsedDeck);
      setShowImportPopup(true);
    } catch (error) {
      console.error("Failed to read from clipboard:", error);
      alert("Failed to read from clipboard.");
    }
  };

  const handleSaveImportedDeck = async () => {
    if (!newDeckName) {
      alert("Please enter a name for the new deck.");
      return;
    }

    try {
      await writeToSheet(sheetsId, `${newDeckName}!A:C`, [
        ["Number", "Name", "Total"],
        ...importedDeck.map((card) => [card.Number, card.Name, card.Total]),
      ]);

      await writeToSheet(directorySheetId, "A:B", [
        [newDeckName, new Date().toISOString()],
      ]);

      alert("Deck imported successfully!");
      setShowImportPopup(false);
      setMasterList((prev) => [...prev, { Name: newDeckName }]);
    } catch (error) {
      console.error("Error saving imported deck:", error);
      alert("Failed to save imported deck.");
    }
  };

  const updateSheet = async (range, values) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/${range}?valueInputOption=USER_ENTERED&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

    const body = {
      range: range,
      majorDimension: "ROWS",
      values: values,
    };

    try {
      await axios.put(url, body);
      console.log("Update successful");
    } catch (error) {
      console.error("Error updating sheet:", error);
    }
  };

  useEffect(() => {
    // const savedDeck = localStorage.getItem("selectedDeck");
    // if (savedDeck) {
    //   setSelectedDeck(JSON.parse(savedDeck));
    // }
  }, []);

  useEffect(() => {
    const fetchMasterList = async () => {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/Master List!A:F?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

      try {
        setLoading(true);
        const response = await axios.get(url);
        const jsonArray = response.data.values.slice(1).map((item) => ({
          Name: item[0],
          Id: item[1],
        }));
        setMasterList(jsonArray); // Adjust based on your expected response structure
      } catch (error) {
        console.error("Error fetching master list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMasterList();
  }, [directorySheetId, sheetsId]);

  useEffect(() => {
    const fetchDeck = async () => {
      if (!selectedDeck || !selectedDeck.Name) {
        console.error("Selected deck is invalid:", selectedDeck);
        return; // Exit if selectedDeck or its Id is not valid
      }

      // Trim whitespace and ensure the Id is a valid string
      const deckId = selectedDeck.Name.trim();
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/${deckId}!A:F?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

      console.log("Fetching deck from URL:", url); // Log the URL for debugging

      try {
        setLoading(true);
        const response = await axios.get(url);
        const jsonArray = response.data.values.slice(1).map((item) => ({
          Card: item[0],
          Number: item[1],
          Total: item[3],
          Have: item[4],
          Need: item[5],
          Shared: item[6],
          Image: getImageUrl(item[1]),
        }));
        setDeckData(jsonArray); // Adjust based on your expected response structure
      } catch (error) {
        console.error("Error fetching deck:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, [selectedDeck, sheetsId]);

  return (
    <>
      {loading && <div className="loading-overlay">Loading...</div>}
      {masterList && (
        <DeckSelector
          onSelectDeck={handleSelectDeck}
          decks={masterList}
          onImportDeck={handleImportDeck}
        />
      )}
      {showImportPopup && (
        <ImportPopup
          importedDeck={importedDeck}
          handleSaveImportedDeck={handleSaveImportedDeck}
          setShowImportPopup={setShowImportPopup}
          deckName={newDeckName}
          setDeckName={setNewDeckName}
        />
      )}
      {selectedDeck && deckData && (
        <DeckDisplay
          deckName={selectedDeck.Name}
          deckId={selectedDeck.Id}
          sheetsId={sheetsId}
          getImageUrl={getImageUrl}
          deckImage={selectedDeck.Image}
          drawCount={5}
          data={deckData}
        />
      )}
    </>
  );
};

export default CardGameContainer;
