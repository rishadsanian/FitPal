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
  const { workoutHistory } = useWorkoutContext();
  //state
  const [workoutData, setWorkoutData] = useState([]);
  const [workoutsThisWeek, SetWorkoutsThisWeek] = useState([]);
  //useref needed to fix canvas clash bug
  const chartRef = useRef(null);

  // Fetch workout data from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/chartworkout/${userId}`);
        setWorkoutData(response.data);
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };
    fetchData();
  }, [userId, workoutData, workoutHistory]); // Only fetch data when userId changes

  // Update workoutsThisWeek whenever workoutData/history changes
  useEffect(() => {
    const currentDate = moment();
    const startDate = moment(currentDate).startOf("isoWeek");
    const endDate = moment(currentDate).endOf("isoWeek");
    SetWorkoutsThisWeek(
      workoutData.filter((workout) => {
        const workoutDate = moment(workout.timestamp);
        return workoutDate.isBetween(startDate, endDate, null, "[]");
      })
    );
  }, [workoutData, workoutHistory]);

  // Update the chart whenever workoutData or workoutsThisWeek changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = processWorkoutData();
      chartRef.current.update();
    }
  }, [workoutData, workoutsThisWeek, workoutHistory]);

  // Process workout data
  const processWorkoutData = () => {
    const exercisesPerDay = new Array(7).fill(0);
    workoutsThisWeek.forEach((workout) => {
      const workoutDate = moment(workout.timestamp);
      const dayIndex = workoutDate.isoWeekday() - 1; // 0 for Monday, 1 for Tuesday, ..., 6 for Sunday
      exercisesPerDay[dayIndex]++;
    });
    return exercisesPerDay;
  };

  // Initialize or update the chart
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = processWorkoutData();
      chartRef.current.update();
    } else {
      const ctx = document.getElementById("workoutChart").getContext("2d");
      ctx.canvas.height = 400;
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
              stepSize: 1,
            },
          },
        },
      };
      chartRef.current = new Chart(ctx, chartConfig);
    }
  }, [workoutData, workoutsThisWeek, workoutHistory]);

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
          <p className="text-white fw-bold pb-3 opacity-75">
            {startDate} - {endDate}
          </p>
          <div
            className="chart-wrapper"
            style={{ display: workoutsThisWeek.length > 0 ? "block" : "none" }}
          >
            <div className="chart-container">
              <canvas id="workoutChart" height="100%" width="100%" />
            </div>
          </div>
          <span className="d-flex align-items-center justify-content-center pt-4 pb-0">
            <a href="#log" className="text-decoration-none text-warning">
              <i className="circle-add-icon fas fa-plus-circle fa-3x opacity-75"></i>
            </a>
          </span>
          {workoutsThisWeek.length === 0 && (
            <p className="text-secondary pt-3">
              No workouts recorded for this week
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartWorkout;
