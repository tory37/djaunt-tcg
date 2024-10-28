import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { readFromSheet, writeToSheet } from "../services/googleSheetsService";

import FullView from "./FullView";
import MidView from "./MidView";
import ListView from "./ListView";
import CarouselView from "./CarouselView";
import EditView from "./EditView";

const DeckDisplay = ({
  deckName,
  deckId,
  sheetsId,
  getImageUrl,
  deckImage,
  drawCount = 5,
  isAuthenticated,
  handleSignOut,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("full");
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleViewChange = (newView) => {
    setView(newView);
    navigate(`?view=${newView}&deckId=${deckId}`);
  };

  useEffect(() => {
    const fetchDeck = async () => {
      if (!isAuthenticated) return;
      try {
        setError(null);
        setLoading(true);
        const values = await readFromSheet(sheetsId, `${deckName}!A:F`);
        const headers = values[0];
        const data = values.slice(1).map((row) => {
          const card = {};
          headers.forEach((header, index) => {
            card[header] = row[index];
          });
          card.Image = getImageUrl(card.Number);
          return card;
        });
        setData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    if (isAuthenticated && deckId && sheetsId && getImageUrl && deckName) {
      fetchDeck();
    }
  }, [deckId, sheetsId, getImageUrl, isAuthenticated, deckName]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const viewParam = params.get("view");

    if (viewParam) {
      setView(viewParam);
    }
  }, [location]);

  const handleSave = async (updatedData) => {
    try {
      setLoading(true);
      const headers = ["Card", "Number", "Total", "Have", "Need"];
      const values = [
        headers,
        ...updatedData.map((card) => headers.map((header) => card[header])),
      ];
      await writeToSheet(sheetsId, `${deckName}!A:F`, values);
      setData(updatedData);
      setLoading(false);
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Error saving data");
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Please sign in to view the deck.</div>;
  }

  return (
    <>
      <h1>{deckName}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <div className="view-selector">
            <button
              onClick={() => handleViewChange("full")}
              className={view === "full" ? "active" : ""}
            >
              Full
            </button>
            <button
              onClick={() => handleViewChange("mid")}
              className={view === "mid" ? "active" : ""}
            >
              Mid
            </button>
            <button
              onClick={() => handleViewChange("list")}
              className={view === "list" ? "active" : ""}
            >
              List
            </button>
            <button
              onClick={() => handleViewChange("carousel")}
              className={view === "carousel" ? "active" : ""}
            >
              Carousel
            </button>
            <button
              onClick={() => handleViewChange("edit")}
              className={view === "edit" ? "active" : ""}
            >
              Edit
            </button>
          </div>
          <div className={`digimon-container`}>
            <div className={`deck-display-container ${view}`}>
              {view === "full" && (
                <FullView data={data} handleCardClick={() => {}} />
              )}
              {view === "mid" && <MidView data={data} />}
              {view === "list" && <ListView data={data} />}
              {view === "carousel" && (
                <CarouselView data={data} drawCount={drawCount} />
              )}
              {view === "edit" && (
                <EditView
                  data={data}
                  onSave={handleSave}
                  getImageUrl={getImageUrl}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeckDisplay;
