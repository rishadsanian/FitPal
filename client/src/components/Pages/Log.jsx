import React from "react";
import WorkoutForm from "../Log/WorkoutForm";
import WorkoutHistory from "../Log/WorkoutHistory";
import { WorkoutProvider } from "../../contexts/WorkoutContext";

const Log = () => {
  return (
    <div className="log container m-auto p-auto">
        <WorkoutForm />
        <WorkoutHistory />
    </div>
  );
};

export default Log;






