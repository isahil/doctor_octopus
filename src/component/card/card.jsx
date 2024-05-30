import React from "react";
import "./card.css";
function Card({ card }) {
  const { stats } = card;
  console.log(`Stats: ${JSON.stringify(stats)}`);
  const { expected, flaky, skipped, unexpected } = stats;

  return (
    <div className="card">
      {/* <img src={image} alt={name} /> */}
      <div className="card-content">
        <h4>Test Result</h4>
        <div className="header-view-status-container ml-2 pl-2 d-flex"> 
        <a className="subnav-item">
          All
          <span className="d-inline counter"> 1 </span>
        </a>
        <a className="subnav-item">
          Passed
          <span className="d-inline counter"> {expected} </span>
        </a>
        <a className="subnav-item">
          Failed
          <span className="d-inline counter"> {unexpected} </span>
        </a>
        <a className="subnav-item">
          Skipped
          <span className="d-inline counter"> {skipped} </span>
        </a>
        <a className="subnav-item">
          Flaky
          <span className="d-inline counter"> {flaky} </span>
        </a>
        </div>
        <button>View Report</button>
      </div>
    </div>
  );
}

export default Card;
