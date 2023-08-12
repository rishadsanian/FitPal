import React, { useEffect, useState } from "react";

import { useWorkoutContext } from "../../contexts/WorkoutContext";
import { useProfileContext } from "../../contexts/ProfileContext";

const Statistics = () => {
  const [totalReps, setTotalReps] = useState(0);
  const [totalSets, setTotalSets] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [favouriteExercise, setFavouriteExercise] = useState("");

  const { profile, fetchProfile } = useProfileContext();
  const { workoutHistory, fetchWorkoutHistory } = useWorkoutContext();


  useEffect(() => {
    setTotalReps(0);
    setTotalWeight(0);
    for(const workout of workoutHistory) {
      setTotalReps(prev => prev + workout.reps);
      setTotalWeight(prev => prev + (workout.reps * workout.resistance))
    }
    setTotalSets(workoutHistory.length)

  }, [workoutHistory.length])

  const getFavouriteWorkout = () => {
    if(workoutHistory.length){
      let favouriteName = workoutHistory[0].exercise_name;; 
      let favouriteCount = 0;
      for(let i = 0; i < workoutHistory.length; i++) {
        // if the count is greater than the length of the rest of the array skip it
        if((favouriteCount) + i < workoutHistory.length){
          let newFavouriteCount = 0;
          let newFavouriteName = workoutHistory[i].exercise_name;
          for(let j = 0; j < workoutHistory.length; j++){ 
            if(workoutHistory[j].exercise_name === workoutHistory[i].exercise_name) {
              newFavouriteCount ++;
            }
          }
          if(newFavouriteCount > favouriteCount) {
            favouriteCount=newFavouriteCount;
            favouriteName=newFavouriteName;
          }
        }
      }
      return favouriteName;
    }
    return "";
  }

  return(
    <div className="d-flex justify-content-center">
      <div className="table-responsive card text-white bg-dark border-secondary border-3 col-6 text-start">
        <table className="table table-bordered table-dark border-secondary table-striped col-6">
          <tbody>
            <tr>
              <th scope="row">
                Total Reps Completed
              </th>
              <td>
                {totalReps}
              </td>
            </tr>
            <tr>
              <th scope="row">
                Average Weight Per Rep
              </th>
              <td>
                {Math.round(totalWeight/totalReps)}lbs
              </td>
            </tr>
            <tr>
              <th scope="row">
                Total Sets Completed
              </th>
              <td>
                {totalSets}
              </td>
            </tr>
            <tr>
              <th scope="row">
                Average Weight Per Set:
              </th>
              <td>
                {Math.round(totalWeight/totalSets)}lbs
              </td>
            </tr>
            <tr>
              <th scope="row">
                Total Weight Moved:
              </th>
              <td>
                {totalWeight}lbs
              </td>
            </tr>
            <tr>
              <th scope="row">
                Favourite Exercise:
              </th>
              <td>
                {getFavouriteWorkout()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Statistics;