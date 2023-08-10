import React from "react";
import WorkoutForm from "../Log/WorkoutForm.jsx";
import WorkoutHistory from "../Log/WorkoutHistory";
import { WorkoutProvider } from "../../contexts/WorkoutContext";

const Log = () => {
  return (
    <div className="log p-5">
      <WorkoutProvider>
        <WorkoutForm />
        <WorkoutHistory />
      </WorkoutProvider>
    </div>
  );
};

export default Log;
