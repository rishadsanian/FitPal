/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useWorkoutContext } from "../../contexts/WorkoutContext";
import { userContext } from "../../contexts/UserContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import "../../styles/Log.css";
import "../../styles/WorkoutHistory.css";

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
        background-color: rgba(102, 102, 102, 0.75); /* Opacity 75% */
        border-radius: 4px;
      }
      
      div::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255, 193, 7, 0.50);
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
          {!workoutDay.length ? (
            <tr>
              <td
                colSpan="2"
                className="workout-entry profile-card p-3 border border-secondary rounded border-3"
              >
                No workouts recorded
              </td>
            </tr>
          ) : (
            workoutDay.reverse().map((workout) => (
              <tr key={workout.id}>
                <td>
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column justify-content-start align-items-start opacity-75">
                      <p>{workout.exercise_name}</p>
                      <p className="badge text-bg-warning me-2 opacity-75">
                        {workout.resistance > 0 &&
                          `${workout.resistance} lbs / ${workout.reps} Reps`}
                      </p>
                    </div>
                    {workout.reps > 0 && (
                      <div className="d-flex justify-content-end gap-3 p-2">
                        <button
                          onClick={() => handleEditWorkout(workout)}
                          disabled={editingWorkout === workout}
                          className="btn"
                        >
                          <i className="far fa-pen-to-square fa-xl text-light opacity-75"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteWorkout(workout.id)}
                          className="btn"
                        >
                          <i className="far fa-trash-can fa-xl text-danger opacity-75"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
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
    allWorkoutHistory,
    fetchAllWorkoutHistory,
  } = useWorkoutContext();

  const [workoutHistoryByday, setWorkoutHistoryByDay] = useState([]);

  useEffect(() => {
    fetchAllWorkoutHistory();
  }, []);

  //the below is being used to fetch all workout history for now/demo purposes and resolve bugs for demo day. Should be switched to less server and data intensive approach for the functionality.

  useEffect(() => {
    let workoutHistorySorted = [];
    // console.log("all workout history", allWorkoutHistory);
    for (let i = 0; i < 7; i++) {
      workoutHistorySorted[i] = [];
    }
    for (let i = 0; i < allWorkoutHistory.length; i++) {
      let currentDate = moment(new Date()).startOf("day");
      let workoutDate = moment(
        new Date(allWorkoutHistory[i].timestamp)
      ).startOf("day");
      let offest = 7 - workoutDate.day();
      let dayToCheck = currentDate.diff(workoutDate, "days");
      if (dayToCheck < 7) {
        workoutHistorySorted[dayToCheck].push(allWorkoutHistory[i]);
      }
    }
    // console.log("Sorted H"workoutHistorySorted);
    setWorkoutHistoryByDay(workoutHistorySorted);
  }, [allWorkoutHistory]);

  return (
    <div className="workout-history-slider container addlog text-white pb-5">
      {/* <div
      className="workout-history-slider container addlog bg-dark text-white rounded py-5 px-3"
      style={{ width: "600px" }}
    ></div> */}

      <h3 className="text-warning fw-bold pb-3 pt-5 opacity-75">
        Daily Workout History
      </h3>

      <Slider
        dots={true}
        infinite={true}
        arrows={true}
        dotsClass={`slick-dots`}
        slidesToShow={1}
        slidesToScroll={1}
        afterChange={(index) => handleSliderChange(index)}
      >
        {workoutHistoryByday.map((workoutDay, index) => (
          <SliderItem
            key={index}
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
