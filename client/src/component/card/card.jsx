import React from "react";
import "./card.css";

function Card({ source, card }) {
  const { json_report, html_report } = card;
  const { stats } = json_report;
  // console.log(`Stats: ${JSON.stringify(stats)} \n${html_report.length === 0 ? "No HTML Report" : "Yes HTML Report"}`);
  const { expected, flaky, skipped, unexpected, startTime } = stats;
  const total = expected + flaky + unexpected;

  const date = new Date(startTime); // Convert startTime to a Date object
  const formattedDateTime = date.toLocaleString(); // Adjust formatting as needed

  const handleViewReportClick = async () => {
    console.log(`Viewing html report: ${html_report}`);
    const response = await fetch(`http://localhost:8000/report?source=${source}&html=${html_report}`);
    const html_report_text = await response.text();

    const newWindow = window.open("", "_blank");
    if(newWindow){
      newWindow.document.open();
      newWindow.document.write(html_report_text);
      newWindow.document.close();
    } else alert('Please allow popups for this website');
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="score-board-container"> 
        <a className="score-board all">
          All
          <span className="score"> {total} </span>
        </a>
        <a className="score-board pass" style={{ color: expected > 0 ? "#2fd711" : "inherit" }}>
          Passed
          <span className="score"> {expected} </span>
        </a>
        <a className="score-board fail" style={{ color: unexpected > 0 ? "red" : "inherit" }}>
          Failed
          <span className="score"> {unexpected} </span>
        </a>
        <a className="score-board skipped" style={{ color: skipped > 0 ? "#e8bb04" : "inherit" }}>
          Skipped
          <span className="score"> {skipped} </span>
        </a>
        <a className="score-board flaky" style={{ color: flaky > 0 ? "yellow" : "inherit" }}>
          Flaky
          <span className="score"> {flaky} </span>
        </a>
        </div>
        <button className="viewReport" onClick={handleViewReportClick}>View Report</button>
        <div className="footer">
          <p className="branch">{stats.git_branch}</p>
          <p className="time-stamp">at {formattedDateTime}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
