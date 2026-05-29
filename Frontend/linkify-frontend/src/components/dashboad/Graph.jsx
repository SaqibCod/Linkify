import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const hasGraphData = Array.isArray(graphData) && graphData.length > 0;
  const labels = hasGraphData ? graphData.map((item) => `${item.clickDate}`) : [];
  const userPerData = hasGraphData ? graphData.map((item) => item.clickCount) : [];

  // This function creates the vertical gradient for the area under the line
  const createGradient = (ctx, top, bottom) => {
    const gradient = ctx.createLinearGradient(0, bottom, 0, top);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');        // Transparent at the bottom
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.4)'); // Light blue at the top
    return gradient;
  };


  const data = {
    labels:
      hasGraphData
        ? labels
        : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data:
          hasGraphData
            ? userPerData
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],


        // Line Styling
        borderColor: '#36A2EB',
        borderWidth: 2,
        tension: 0.5,
        backgroundColor:
          hasGraphData ? (context) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) {
              return "rgba(54, 162, 235, 0.1)";
            }
            return createGradient(ctx, chartArea.top, chartArea.bottom);
          }
            : "rgba(54, 162, 235, 0.1)",
        fill: true,
        pointBackgroundColor: '#36A2EB',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
            color: "#FF0000",
          },
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Date",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
            color: "#FF0000",
          },
        },
      },
    },
  };

  return <Line className=" w-full" data={data} options={options}></Line>;
};

export default Graph;