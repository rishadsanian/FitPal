import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, PointElement, LineElement } from "chart.js";
import "chart.js/auto"; // Import the auto package
import moment from "moment";
import { useProfileContext } from "../../contexts/ProfileContext";

const WeightChart = ({ userId, selectedInterval }) => {
  const { profileHistory, fetchHistoricalProfileData } = useProfileContext();
  Chart.register(PointElement, LineElement);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistoricalProfileData();
  }, [userId, selectedInterval]);

  useEffect(() => {
    if (profileHistory) {
      setLoading(false);
    }
  }, [profileHistory]);

  // Process profileHistory data into chart data points
  const chartData = profileHistory
    ? profileHistory.map((entry) => ({
        x: moment(entry.day).toDate(),
        y: entry.weights[0],
      }))
    : [];

  const chartConfig = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Weight",
        },
      },
    },
    datasets: [
      {
        label: "Average Weight",
        data: chartData,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return loading ? <div>Loading...</div> : <Line data={chartConfig} />;
};

export default WeightChart;
