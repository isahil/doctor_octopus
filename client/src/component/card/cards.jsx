import React from 'react';
import Card from './card';
import './cards.css';

const Cards = ({ source, data }) => {
    console.log(`There are total of ${data.length} cards in the grid.`);
    return (
        <div>
            {data.map((card, index) => (
                <Card key={index} source={source} card={card} />
            ))}
        </div>
    );
};

export default Cards;