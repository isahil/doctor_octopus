import React, { useEffect, useState } from "react";
import Card from "./card";
import "./cards.css";

const Cards = ({ source }) => {
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCards = async () => {
    try {
      const response = await fetch(`http://localhost:8000/cards?source=${source}`);
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error fetching cards data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect( () => {
    getCards()
    console.log(`There are total of ${cards.length} cards in the grid.`);
  },[source]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {cards.map((card, index) => (
        <Card key={index} source={source} card={card} />
      ))}
    </div>
  );
};

export default Cards;
