/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import {
  Chart,
  LinearScale,
  BarController,
  CategoryScale,
  BarElement,
} from "chart.js";
import moment from "moment";
import { userContext } from "../../contexts/UserContext";
import { useWorkoutContext } from "../../contexts/WorkoutContext";

Chart.register(LinearScale, BarController, CategoryScale, BarElement);

const ChartWorkout = () => {
  const { userId } = useContext(userContext); 
  //state
  const [workoutData, setWorkoutData] = useState([]);
  const { workoutHistory, allWorkoutHistory } = useWorkoutContext();
  //useref needed to fix canvas clash bug
  const chartRef = useRef(null);

  // get data from db
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`/api/chartworkout/${userId}`); //hard-coded change to current user
  //       console.log(response.data);
  //       setWorkoutData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching workout data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [workoutHistory.length]);

  //extract and process needed data
  const processWorkoutData = () => {
    const currentDate = moment();
    //Process data for one week
    const startDate = moment(currentDate).startOf("isoWeek");
    const endDate = moment(currentDate).endOf("isoWeek");
    //Filter log data for one week
    const workoutsThisWeek = allWorkoutHistory.filter((workout) => {
      const workoutDate = moment(workout.timestamp);
      return workoutDate.isBetween(startDate, endDate, null, "[]");
    });
    //
    const exercisesPerDay = new Array(7).fill(0);

    workoutsThisWeek.forEach((workout) => {
      const workoutDate = moment(workout.timestamp);
      const dayIndex = workoutDate.isoWeekday() - 1; // 0 for Monday, 1 for Tuesday, ..., 6 for Sunday
      exercisesPerDay[dayIndex]++;
    });

    return exercisesPerDay;
  };

  useEffect(() => {
    // Initialize or update the chart when the workoutData changes
    console.log(chartRef.current);
    if (!chartRef.current) {
      // Create chart for the first time
      const ctx = document.getElementById("workoutChart").getContext("2d");
      ctx.canvas.height = 400;
      //Configurations for chart
      const chartConfig = {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Number of Exercises",
              backgroundColor: "rgba(255, 193, 7, 0.2)",
              borderColor: "#ffc107",
              borderWidth: 1,
              data: processWorkoutData(),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1, // Set the step size to 1 to show whole numbers on the y-axis
            },
          },
        },
      };
      chartRef.current = new Chart(ctx, chartConfig);
    } else {
      // Update the existing chart
      console.log(chartRef)
      chartRef.current.data.datasets[0].data = processWorkoutData();
      console.log("proccessed workout data: ", processWorkoutData());
      console.log(chartRef.current.data.datasets[0].data)
      chartRef.current.update();
    }
  }, [allWorkoutHistory.length]);

  const currentDate = moment();
  const startDate = moment(currentDate)
    .startOf("isoWeek")
    .format("MMM D, YYYY");
  const endDate = moment(currentDate).endOf("isoWeek").format("MMM D, YYYY");

  return (
    <div className="chart-container">
      <div className="card bg-dark weekly-tracker-card mb-3 p-3 border border-secondary rounded border-3 ">
        <div className="card-body">
          <h3 className="pt-1 pb-2 text-warning fw-bold weekly-tracker-header py-5 opacity-75">
            Weekly Exercise Tracker
          </h3>
          <p className="text-secondary pb-3">
            {startDate} - {endDate}
          </p>
          <div>
            <div className="chart-wrapper">
              <div className="chart-container">
                <canvas id="workoutChart" height="100%" width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartWorkout;
