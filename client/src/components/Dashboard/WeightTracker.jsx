import React, { useContext } from "react";
import WeightChart from "./ChartWeight";
import { useProfileContext } from "../../contexts/ProfileContext";
import { userContext } from "../../contexts/UserContext";

const WeightTracker = () => {
  const { selectedInterval, setSelectedInterval } = useProfileContext();
  const { userId } = useContext(userContext);

  return (
    <div className="card bg-dark weekly-tracker-card mb-3 p-3 border border-secondary rounded border-3 ">
      
      <h3 className="pt-4 pb-2 text-warning fw-bold weekly-tracker-header py-5 opacity-75">Weight Tracker</h3>
      <div className="pt-3 pb-3">
        <span
          className="badge bg-dark me-2 pt-1 opacity-75 text-warning"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedInterval("7d")}
        >
          7 Days
        </span>
        <span
          className="badge bg-dark me-2 pt-1 opacity-75 text-warning"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedInterval("30d")}
        >
          30 Days
        </span>
        <span
          className="badge bg-dark me-2 pt-1 opacity-75 text-warning"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedInterval("1yr")}
        >
          1 Year
        </span>
      </div>

      <WeightChart userId={userId} selectedInterval={selectedInterval} />
    </div>
  );
};

export default WeightTracker;
