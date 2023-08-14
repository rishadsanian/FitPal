import React, { useContext, useState } from "react";
import WeightChart from "./ChartWeight";
import { useProfileContext } from "../../contexts/ProfileContext";
import { userContext } from "../../contexts/UserContext";
import "../../styles/WeightTracker.css";

const WeightTracker = () => {
  const { selectedInterval, setSelectedInterval } = useProfileContext();
  const { userId } = useContext(userContext);
  const [selectedTab, setSelectedTab] = useState("7d"); // Add this state

  const handleIntervalClick = (interval) => {
    setSelectedInterval(interval);
    setSelectedTab(interval); // Update the selected tab
  };


  return (
    <div className="card bg-dark weight-tracker-card mb-3 p-3 border border-secondary rounded border-3 ">
      <h3 className="pt-4 pb-2 text-warning fw-bold weight-tracker-header py-5 opacity-75 ">
        Weight Tracker
      </h3>

      <div className="pt-3 pb-3">
        <span
          className={`interval badge me-2 focus-ring pt-1 opacity-75 ${
            selectedTab === "7d" ? "focus-ring-warning" : ""
          }`}
          style={{ cursor: "pointer",
          color: selectedTab === "7d"? "#343a40" : "" ,
          backgroundColor: selectedTab === "7d" ? "#ffc107" : "", }}
          onClick={() => handleIntervalClick("7d")}
        >
          7 Days
        </span>
        <span
          className={`interval badge me-2 focus-ring pt-1 opacity-75 ${
            selectedTab === "30d" ? "focus-ring-warning" : ""
          }`}
          style={{ cursor: "pointer",
          color: selectedTab === "30d"? "#343a40" : "" ,
          backgroundColor: selectedTab === "30d" ? "#ffc107" : "", }}
          onClick={() => handleIntervalClick("30d")}
        >
          30 Days
        </span>
        <span
          className={`interval badge me-2 focus-ring pt-1 opacity-75 ${
            selectedTab === "1yr" ? "focus-ring-warning" : ""
          }`}
          style={{ cursor: "pointer",
          color: selectedTab === "1yr"? "#343a40" : "" ,
          backgroundColor: selectedTab === "1yr" ? "#ffc107" : "", }}
          onClick={() => handleIntervalClick("1yr")}
        >
          1 Year
        </span>
        <span className="d-flex align-items-center justify-content-center pt-4 pb-0">
          <a href="#profile" className="text-decoration-none text-warning">
            <i className="circle-add-icon fas fa-plus-circle fa-3x opacity-75"></i>
          </a>
        </span>
      </div>

      <WeightChart userId={userId} selectedInterval={selectedInterval} />
    </div>
  );
};

export default WeightTracker;
