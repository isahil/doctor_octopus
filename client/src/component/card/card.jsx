import React from "react";
import "./card.css";

function Card({ card }) {
  // console.log(`Card: ${JSON.stringify(card)}`);
  const { json_report, html_report } = card;
  const { stats } = json_report;
  console.log(`Stats: ${JSON.stringify(stats)} 
  \n${html_report === undefined ? "No HTML Report" : "Yes HTML Report"}`);
  const { expected, flaky, skipped, unexpected } = stats;

  const handleViewReportClick = () => {
    console.log(`Viewing html report`);
    const blob = new Blob([`${html_report}`], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank");
  }

  return (
    <div className="card">
      <div className="card-content">
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
        <button className="viewReport" onClick={handleViewReportClick}>View Report</button>
      </div>
    </div>
  );
}

export default Card;
