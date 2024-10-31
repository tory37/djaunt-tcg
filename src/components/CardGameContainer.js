import React, { useEffect, useState } from "react";
import axios from "axios";
import DeckSelector from "./DeckSelector";
import DeckDisplay from "./DeckDisplay";
import ImportPopup from "./ImportPopup";
import {
  writeToSheet,
  fetchMasterList,
  fetchDeck,
} from "../services/googleSheets"; // Import the new functions

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
    sessionStorage.setItem("selectedDeck", JSON.stringify(deck));
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

  // const handleSaveImportedDeck = async () => {
  //   if (!newDeckName) {
  //     alert("Please enter a name for the new deck.");
  //     return;
  //   }

  //   try {
  //     await writeToSheet(sheetsId, `${newDeckName}!A:C`, [
  //       ["Number", "Name", "Total"],
  //       ...importedDeck.map((card) => [card.Number, card.Name, card.Total]),
  //     ]);

  //     await writeToSheet(directorySheetId, "A:B", [
  //       [newDeckName, new Date().toISOString()],
  //     ]);

  //     alert("Deck imported successfully!");
  //     setShowImportPopup(false);
  //     setMasterList((prev) => [...prev, { Name: newDeckName }]);
  //   } catch (error) {
  //     console.error("Error saving imported deck:", error);
  //     alert("Failed to save imported deck.");
  //   }
  // };

  // const handleSaveEditedDeck = async (updatedData) => {
  //   try {
  //     setLoading(true);
  //     const headers = ["Card", "Number", "Total", "Have", "Need", "Shared"];
  //     const values = [
  //       headers,
  //       ...updatedData.map((card) => headers.map((header) => card[header])),
  //     ];
  //     await writeToSheet(sheetsId, `${selectedDeck.Name}!A:F`, values);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchMasterListData = async () => {
      const masterListData = await fetchMasterList(sheetsId);
      setMasterList(masterListData);
    };
    fetchMasterListData();
  }, [directorySheetId, sheetsId]);

  useEffect(() => {
    const fetchDeckData = async () => {
      if (!selectedDeck || !selectedDeck.Name) {
        console.error("Selected deck is invalid:", selectedDeck);
        return;
      }
      const deckData = await fetchDeck(
        sheetsId,
        selectedDeck.Name,
        getImageUrl
      );
      setDeckData(deckData);
    };
    fetchDeckData();
  }, [selectedDeck, sheetsId, getImageUrl]);

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
      {/* {showImportPopup && (
        <ImportPopup
          importedDeck={importedDeck}
          handleSaveImportedDeck={handleSaveImportedDeck}
          setShowImportPopup={setShowImportPopup}
          deckName={newDeckName}
          setDeckName={setNewDeckName}
        />
      )} */}
      {selectedDeck && deckData && (
        <DeckDisplay
          deckName={selectedDeck.Name}
          deckId={selectedDeck.Id}
          sheetsId={sheetsId}
          getImageUrl={getImageUrl}
          deckImage={selectedDeck.Image}
          drawCount={5}
          data={deckData}
          // handleSave={handleSaveEditedDeck}
        />
      )}
    </>
  );
};

export default CardGameContainer;
