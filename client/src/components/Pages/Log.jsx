import React from "react";
import WorkoutForm from "../Log/WorkoutForm";
import WorkoutHistory from "../Log/Workout-History";
import { WorkoutProvider } from "../../contexts/WorkoutContext";

const Log = () => {
  return (
    <div className="log container m-auto p-auto">
      <WorkoutProvider>
        <WorkoutForm />
        <WorkoutHistory />
      </WorkoutProvider>
    </div>
  );
};

export default Log;
