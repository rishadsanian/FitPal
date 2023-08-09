import React from "react";
import { WorkoutProvider } from "../../contexts/WorkoutContext";
import WorkoutForm from "../Log/WorkoutForm";
import WorkoutHistory from "../Log/Workout-History";

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
