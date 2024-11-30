import React, { useEffect, useState } from "react";
import Card from "./card";
import "./cards.css";
import { SERVER_HOST, SERVER_PORT } from "../../index";

const Cards = ({ source }) => {
  const [cards, set_cards] = React.useState([]);
  const [is_loading, set_is_loading] = useState(true);

  const get_cards = async () => {
    try {
      const response = await fetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/reports?source=${source}`
      );
      const data = await response.json();
      console.log(`Total ${source} cards: ${data.length}`);
      set_cards(data);
    } catch (error) {
      console.error("Error fetching cards data:", error);
    } finally {
      set_is_loading(false);
    }
  };

  useEffect(() => {
    get_cards();
  }, [source]);

  if (is_loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="cards-component">
      <div className="cards-header">
        <button onClick={get_cards} className="refresh-button">
          refresh
        </button>
      </div>
      <div className="cards-body">
        {cards.map((card, index) => (
          <Card key={index} source={source} card={card} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
