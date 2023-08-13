import React, { useContext } from "react";
import WeightChart from "./ChartWeight";
import { useProfileContext } from "../../contexts/ProfileContext"; 
import { userContext } from "../../contexts/UserContext";


const WeightTracker = () => {
  const { selectedInterval, setSelectedInterval } = useProfileContext(); 
  const { userId } = useContext(userContext);

  return (
    <div>
      {/* Component to change the selected interval */}
      <button onClick={() => setSelectedInterval("7d")}>7 Days</button>
      <button onClick={() => setSelectedInterval("30d")}>30 Days</button>
      <button onClick={() => setSelectedInterval("1yr")}>1 Year</button>

      {/* Display the weight chart */}
      <WeightChart userId={userId} selectedInterval={selectedInterval} />
    </div>
  );
};

export default WeightTracker;
