import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { writeToSheet } from "../services/googleSheetsService";

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
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("full");

  const navigate = useNavigate();
  const location = useLocation();

  const handleViewChange = (newView) => {
    setView(newView);
    navigate(`?view=${newView}&deckId=${deckId}`);
  };

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
      setLoading(false);
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Error saving data");
      setLoading(false);
    }
  };

  return (
    <>
      <h1>{deckName}</h1>
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
