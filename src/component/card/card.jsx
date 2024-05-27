import React from "react";

function Card({ card }) {
  const { name, age, job, about, image } = card;

  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="card-content">
        <h3>{name}'s Card</h3>
        <p>Age: {age}</p>
        <p>Job: {job}</p>
        <p>About: {about}</p>
        <button>More</button>
      </div>
    </div>
  );
}

export default Card;
