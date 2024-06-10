import React from "react";
import "./card.css";

function Card({ card }) {
  const { stats } = card;
  console.log(`Stats: ${JSON.stringify(stats)}`);
  const { expected, flaky, skipped, unexpected } = stats;

  return (
    <div className="card">
      <div className="card-content">
        {/* <a className="card-title">Report Card</a> */}
        <div className="score-board-container"> 
        <a className="score-board all">
          All
          <span className="score"> 1 </span>
        </a>
        <a className="score-board pass">
          Passed
          <span className="score"> {expected} </span>
        </a>
        <a className="score-board fail">
          Failed
          <span className="score"> {unexpected} </span>
        </a>
        <a className="score-board skipped">
          Skipped
          <span className="score"> {skipped} </span>
        </a>
        <a className="score-board flaky">
          Flaky
          <span className="score"> {flaky} </span>
        </a>
        </div>
        <button className="viewReport">View Report</button>
      </div>
    </div>
  );
}

export default Card;
