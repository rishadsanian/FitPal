import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Chart, LinearScale, BarController, CategoryScale, BarElement } from "chart.js";
import moment from "moment";

Chart.register(LinearScale, BarController, CategoryScale, BarElement);

const ChartWorkout = ({ userId }) => {
  const [workoutData, setWorkoutData] = useState([]);
  const chartRef = useRef(null);
  // const userId = 3

  // get data from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/chartWorkout/3`);//hard-coded change to current user
        setWorkoutData(response.data);
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };

    fetchData();
  }, [userId]);

  //extract and process needed data
  const processWorkoutData = () => {
    const currentDate = moment();
    const startDate = moment(currentDate).startOf("isoWeek");
    const endDate = moment(currentDate).endOf("isoWeek");

    const workoutsThisWeek = workoutData.filter((workout) => {
      const workoutDate = moment(workout.timestamp);
      return workoutDate.isBetween(startDate, endDate, null, "[]");
    });

    const daysWorkedOut = new Array(7).fill(false);

    workoutsThisWeek.forEach((workout) => {
      const workoutDate = moment(workout.timestamp);
      const dayIndex = workoutDate.isoWeekday() - 1; // 0 for Monday, 1 for Tuesday, ..., 6 for Sunday
      daysWorkedOut[dayIndex] = true;
    });

    return daysWorkedOut;
  };

  useEffect(() => {
    // Initialize or update the chart when the workoutData changes
    if (!chartRef.current) {
      // Create the chart for the first time
      const ctx = document.getElementById("workoutChart").getContext("2d");
      const chartConfig = {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Days Worked Out",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              data: processWorkoutData(),
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };
      chartRef.current = new Chart(ctx, chartConfig);
    } else {
      // Update the existing chart
      chartRef.current.data.datasets[0].data = processWorkoutData();
      chartRef.current.update();
    }
  }, [workoutData]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2>Workout Days for the Week</h2>
      <Slider {...sliderSettings}>
        <div>
          <h3>Current Week</h3>
          <div>
            <canvas id="workoutChart" />
          </div>
        </div>
        {/* Add more weeks here if desired */}
      </Slider>
    </div>
  );
};

export default ChartWorkout;
