import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { merge } from "chart.js/helpers";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Metricsfromec2 = () => {
  const [logs, setLogs] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  const [ramData, setRamData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  // Dummy data generator
  const generateDummyData = () => {
    const now = new Date();
    return {
      timestamp: now.toISOString(),
      cpu: Math.random() * 100, // Random CPU usage between 0 and 100
      ram: Math.random() * 100, // Random RAM usage between 0 and 100
    };
  };

  // Fetch data from the API or use dummy data
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // Simulate fetching data
        const dummyLog = generateDummyData();

        // Update logs and charts
        setLogs((prevLogs) => [...prevLogs.slice(-9), dummyLog]); // Keep only the last 10 entries
        setTimestamps((prev) => [...prev.slice(-9), new Date(dummyLog.timestamp).toLocaleTimeString()]);
        setCpuData((prev) => [...prev.slice(-9), dummyLog.cpu]);
        setRamData((prev) => [...prev.slice(-9), dummyLog.ram]);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    // Initial fetch and set interval
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  const cpuChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "CPU Utilization (%)",
        data: cpuData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white", // Set the color of the legend text
          font: {
            size: 14, // Set the font size of the legend text
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Set the color of the x-axis tick labels
          font: {
            size: 12, // Set the font size of the x-axis tick labels
          },
        },
      },
      y: {
        ticks: {
          color: "white", // Set the color of the y-axis tick labels
          font: {
            size: 12, // Set the font size of the y-axis tick labels
          },
        },
      },
    },
  };
  

  // Data for RAM utilization chart
  const ramChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "RAM Utilization (%)",
        data: ramData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full   ">

      <div className="grid grid-cols-1 text-white md:grid-cols-1 gap-8">
        {/* CPU Utilization Chart */}
        <div className="bg-black bg-opacity-30  p-4 shadow rounded-lg">
          <h2 className="text-xl  font-semibold mb-4">CPU Utilization</h2>
          <Line data={cpuChartData} options={options} />
        </div>

        {/* RAM Utilization Chart */}
        <div className="bg-black bg-opacity-30  p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">RAM Utilization</h2>
          <Line data={ramChartData} options={options} />
        </div>
      </div>
      
    </div>
  );
};

export default Metricsfromec2;
