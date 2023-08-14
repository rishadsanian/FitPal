import React, { useContext } from "react";
import WeightChart from "./ChartWeight";
import { useProfileContext } from "../../contexts/ProfileContext";
import { userContext } from "../../contexts/UserContext";
import "../../styles/WeightTracker.css";

const WeightTracker = () => {
  const { selectedInterval, setSelectedInterval } = useProfileContext();
  const { userId } = useContext(userContext);

  return (
    <div className="card bg-dark weight-tracker-card mb-3 p-3 border border-secondary rounded border-3 ">
      <h3 className="pt-4 pb-2 text-warning fw-bold weight-tracker-header py-5 opacity-75 ">
        Weight Tracker
      </h3>

      <div className="pt-3 pb-3">
        <span
          className="interval badge me-2 focus-ring pt-1 opacity-75 focus-ring focus-ring-warning py-1 px-2 text-decoration-none"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedInterval("7d")}
        >
          7 Days
        </span>
        <span
          className="interval badge me-2 focus-ring pt-1 opacity-75 focus-ring focus-ring-warning py-1 px-2 text-decoration-none"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedInterval("30d")}
        >
          30 Days
        </span>
        <span
          className="interval badge me-2 focus-ring pt-1 opacity-75 focus-ring focus-ring-warning py-1 px-2 text-decoration-none"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedInterval("1yr")}
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
