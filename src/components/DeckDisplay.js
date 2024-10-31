import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import FullView from "./FullView";
import MidView from "./MidView";
import ListView from "./ListView";
import CarouselView from "./CarouselView";
// import EditView from "./EditView";

const DeckDisplay = ({
  deckName,
  deckId,
  sheetsId,
  getImageUrl,
  deckImage,
  drawCount = 5,
  data,
  handleSave,
}) => {
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

  useEffect(() => {
    if (!view) {
      setView("full");
    }
  }, [view]);

  return (
    <>
      <h1>{deckName}</h1>
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
        {/* <button
          onClick={() => handleViewChange("edit")}
          className={view === "edit" ? "active" : ""}
        >
          Edit
        </button> */}
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
          {/* {view === "edit" && (
            <EditView
              data={data}
              onSave={handleSave}
              getImageUrl={getImageUrl}
            />
          )} */}
        </div>
      </div>
    </>
  );
};

export default DeckDisplay;
