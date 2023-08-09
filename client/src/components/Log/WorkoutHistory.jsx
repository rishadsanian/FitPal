/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useWorkoutContext } from "../../contexts/WorkoutContext";
import { userContext } from "../../contexts/UserContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import "../../styles/Log.css";

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
      className="workout-history-slider container addlog bg-dark text-white rounded py-5 px-3"
      style={{ width: "600px" }}
    >
      <h3 className="text-warning fw-bold">Daily Workout History</h3>

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
          <div className="workout-entry border rounded p-3 mb-2 slick-slide">
            No workouts recorded
          </div>
        ) : (
          // Render actual workout entries if workoutHistory is not empty
          workoutHistory.map((workout) => (
            <div
              key={workout.id}
              className="workout-entry border rounded p-3 mb-2 slick-slide"
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
                                `${workout.resistance} lbs`}
                            </div>
                            <div className="badge text-bg-warning">
                              {workout.reps > 0 && `${workout.reps} Reps`}
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
          ))
        )}
      </Slider>
    </div>
  );
};

export default WorkoutHistory;
