import React from 'react';
import Card from './card';
import '../../index.css';

const Cards = ({ data }) => {
    console.log(`There are total of ${data.length} cards in the grid.`);
    return (
        <div>
            {data.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </div>
    );
};

export default Cards;