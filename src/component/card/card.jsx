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
        <a className="score-board">
          All
          <span className="d-inline score"> 1 </span>
        </a>
        <a className="score-board">
          Passed
          <span className="d-inline score"> {expected} </span>
        </a>
        <a className="score-board">
          Failed
          <span className="d-inline score"> {unexpected} </span>
        </a>
        <a className="score-board">
          Skipped
          <span className="d-inline score"> {skipped} </span>
        </a>
        <a className="score-board">
          Flaky
          <span className="d-inline score"> {flaky} </span>
        </a>
        </div>
        <button>View Report</button>
      </div>
    </div>
  );
}

export default Card;
