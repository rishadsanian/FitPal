import React from "react";
import WorkoutHistoryCopy from "../Log/WorkoutHistoryCopy";
import { WorkoutProvider } from "../../contexts/WorkoutContext";

 function DevTest(){

  return (
    <div>
      <WorkoutProvider>
        <WorkoutHistoryCopy/>
      </WorkoutProvider>
    </div>
  )
}

export default DevTest;