import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Papa from "papaparse";
import axios from "axios";

import FullView from "./FullView";
import MidView from "./MidView";
import ListView from "./ListView";
import CarouselView from "./CarouselView";

const DeckDisplay = ({
  deckName,
  deckId,
  sheetsId,
  getImageUrl,
  deckImage,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("full");

  const navigate = useNavigate();
  const location = useLocation();

  const isResponseFieldValid = (value) => {
    return value !== undefined && value !== null && value !== "";
  };

  const handleViewChange = (newView) => {
    setView(newView);
    navigate(`?view=${newView}&deckId=${deckId}`);
  };

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const URL = `https://docs.google.com/spreadsheets/d/${sheetsId}/pub?gid=${deckId}&single=true&output=csv`;
        const response = await axios.get(URL);
        console.log("Deck fetched successfully:", response.data);

        Papa.parse(response.data, {
          header: true,
          complete: async (results) => {
            console.log("CSV parsing complete. Parsed data:", results.data);

            const filteredData = results.data
              .filter(
                (card) =>
                  isResponseFieldValid(card["Card"]) &&
                  isResponseFieldValid(card["Number"]) &&
                  isResponseFieldValid(card["Total"]) &&
                  isResponseFieldValid(card["Have"]) &&
                  isResponseFieldValid(card["Need"])
              )
              ?.map((card) => ({
                ...card,
                Image: getImageUrl(card["Number"]),
              }));

            setData(filteredData);
            setLoading(false);
          },
          error: (err) => {
            console.error("Error parsing CSV data:", err);
            setError("Error parsing CSV data");
            setLoading(false);
          },
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    if (deckId && sheetsId && getImageUrl) {
      fetchDeck();
    }
  }, [deckId, sheetsId, getImageUrl]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const viewParam = params.get("view");

    if (viewParam) {
      setView(viewParam);
    }
  }, [location]);

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
          </div>
          <div className={`digimon-container`}>
            <div className={`deck-display-container ${view}`}>
              {view === "full" && (
                <FullView data={data} handleCardClick={() => {}} />
              )}
              {view === "mid" && <MidView data={data} />}
              {view === "list" && <ListView data={data} />}
              {view === "carousel" && <CarouselView data={data} />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeckDisplay;
