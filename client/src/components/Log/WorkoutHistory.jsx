/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useWorkoutContext } from "../../contexts/WorkoutContext";
import { userContext } from "../../contexts/UserContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import "../../styles/Log.css";

const SliderItem = ({
  workoutHistory,
  currentDate,
  handleDeleteWorkout,
  editingWorkout,
  handleEditWorkout,
  workoutDay,
}) => {
  return (
    <div
      className="pt-0 pb-0 m-0 border bg-dark border-secondary bs-border-opacity-75 rounded flex-column border-3"
      style={{
        margin: "0 10px",
        height: "307px",
        overflow: "hidden",
        overflowX: "auto",
        overflowY: "scroll",
      }}
    >
      <style>
        {`
      /* Scrollbar Styles for the specific div */
      div::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      div::-webkit-scrollbar-track {
        background: #333333;
      }

      div::-webkit-scrollbar-thumb {
        background-color: #666666;
        border-radius: 4px;
      }

      div::-webkit-scrollbar-thumb:hover {
        background-color: #ffc107;
      }
    `}
      </style>
      <table className="table table-dark table-striped mt-3">
        <tbody>
          <tr>
            <td colSpan="2">
              <p className="fw-bold text-secondary">
                {moment().subtract(currentDate, "day").format("MMMM DD, YYYY")}
              </p>
            </td>
          </tr>
          {!workoutDay.length && (
            <div className="workout-entry workout-entry profile-card p-3 border border-secondary rounded border-3">
              No workouts recorded
            </div>
          )}
          {workoutDay.map((workout) => (
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
  );
};

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

  const [workoutHistoryByday, setWorkoutHistoryByDay] = useState([]);

  useEffect(() => {
    fetchWorkoutHistory();
  }, []);

  useEffect(() => {
    let workoutHistorySorted = [];
    for (let i = 0; i < 7; i++) {
      workoutHistorySorted[i] = [];
    }
    for (let i = 0; i < workoutHistory.length; i++) {
      let dayToCheck = moment(new Date()).diff(
        workoutHistory[i].timestamp,
        "days"
      );
      if (moment(new Date()).diff(workoutHistory[i].timestamp, "days") < 7) {
        workoutHistorySorted[dayToCheck].push(workoutHistory[i]);
      }
    }
    console.log(workoutHistorySorted);
    setWorkoutHistoryByDay(workoutHistorySorted);
  }, [workoutHistory.length]);

  return (
    <div className="workout-history-slider container addlog text-white rounded ">
      {/* <div
      className="workout-history-slider container addlog bg-dark text-white rounded py-5 px-3"
      style={{ width: "600px" }}
    ></div> */}
      <h3 className="text-warning fw-bold pb-3 pt-5">Daily Workout History</h3>

      <Slider
        dots={true}
        infinite={true}
        arrows={true}
        slidesToShow={1}
        slidesToScroll={1}
        afterChange={(index) => handleSliderChange(index)}
      >
        {workoutHistoryByday.map((workoutDay, index) => (
          <SliderItem
            workoutDay={workoutDay}
            workoutHistory={workoutDay}
            currentDate={index}
            handleEditWorkout={handleEditWorkout}
            editingWorkout={editingWorkout}
            handleDeleteWorkout={handleDeleteWorkout}
          />
        ))}
      </Slider>
    </div>
  );
};

export default WorkoutHistory;
