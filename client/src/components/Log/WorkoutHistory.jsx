/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useWorkoutContext } from "../../contexts/WorkoutContext";
import { userContext } from "../../contexts/UserContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import "../../styles/Log.css";

const SliderItem = ({ workout, workoutHistory, currentDate, handleDeleteWorkout, editingWorkout, handleEditWorkout}) => {
  // const [uniqueExerciseNames, setUniqueExerciseNames] = useState([]);

  // useEffect(() => {
  //   const exerciseList = [];
  //   for(const workout of workoutHistory) {
  //     if(!exerciseList.includes(workout.exercise_name)) {
  //       exerciseList.push(workout.exercise_name)
  //     }
  //   }
  //   setUniqueExerciseNames(exerciseList);
  // }, [])
 
  return(
    // Render actual workout entries if workoutHistory is not empty
    <div
      key={workout.id}
      className="h-100 slider-item p-3 border border-secondary rounded border-3"
      style={{
        margin: "0 10px",
        backgroundColor: "rgba(52, 58, 64, 0.75)",
      }}
    >
      <table className="table table-dark table-striped mt-3">
        <tbody>
          <tr>
            <td colSpan="2">
              <p className="fw-bold">
                {moment(currentDate).format("MMMM D, YYYY")}
              </p>
            </td>
          </tr>
          {workoutHistory.map((workout) => (
            <tr key={workout.exercise_name}>
              <td className="d-flex flex-row  justify-content-between">
                <div className="d-flex flex-column justify-content-start align-items-start">
                  <div>{workout.exercise_name}</div>
                  <div>
                    <div className="badge text-bg-warning me-2">
                      {workout.resistance > 0 &&
                        `${workout.resistance} lbs / ${workout.reps} Reps`}
                    </div>
                  </div>
                </div>
                {workout.reps > 0 && (
                  <div className="d-flex justify-content-end gap-3 p-2">
                    <button
                      onClick={() => handleEditWorkout(workout)}
                      disabled={editingWorkout === workout}
                      className="btn btn-dark"
                    >
                      <i className="far fa-pen-to-square fa-xl text-light"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteWorkout(workout.id)}
                      className="btn btn-dark"
                    >
                      <i className="far fa-trash-can fa-xl text-danger"></i>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const WorkoutHistory = () => {
  const {
    workoutHistory,
    handleSliderChange,
    handleEditWorkout,
    handleDeleteWorkout,
    currentDate,
    editingWorkout,
    fetchWorkoutHistory,
  } = useWorkoutContext();

  const { userId } = useContext(userContext);

  useEffect(() => {
    fetchWorkoutHistory();
  }, [currentDate]);

  return (
    <div
      className="workout-history-slider container addlog bg-dark text-white rounded"
    >
      <h3 className="text-warning fw-bold pb-3">Daily Workout History</h3>

      <Slider
        dots={true}
        infinite={true}
        arrows={true}
        slidesToShow={1}
        slidesToScroll={1}
        afterChange={(index) => handleSliderChange(index)}
      >
        {workoutHistory.length === 0 ? (
          // Render a placeholder entry if workoutHistory is empty
          <div className="workout-entry workout-entry profile-card p-3 border border-secondary rounded border-3">
            No workouts recorded
          </div>
          
        ) : (
          // Render actual workout entries if workoutHistory is not empty
          workoutHistory.map((workout) => (
            <SliderItem 
              workout={workout} 
              workoutHistory={workoutHistory}
              currentDate={currentDate}
              handleEditWorkout={handleDeleteWorkout}
              editingWorkout={editingWorkout}
              handleDeleteWorkout={handleDeleteWorkout}
            />
          ))
        )}
      </Slider>
    </div>
  );
};

export default WorkoutHistory;
