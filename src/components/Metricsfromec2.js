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

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Metricsfromec2 = () => {
  const [logs, setLogs] = useState([]);
  const [statusLogs, setStatusLogs] = useState([]); // Store system status logs
  const [cpuData, setCpuData] = useState([]);
  const [ramData, setRamData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [cpuThreshold, setCpuThreshold] = useState(80);
  const [ramThreshold, setRamThreshold] = useState(80);

  const generateDummyData = (prevCpu, prevRam) => {
    const now = new Date();
    const newCpu = prevCpu < 100 ? prevCpu + Math.random() * 10 : 100; // Simulate increase
    const newRam = prevRam < 100 ? prevRam + Math.random() * 10 : 100; // Simulate increase
    return {
      timestamp: now.toISOString(),
      cpu: newCpu,
      ram: newRam,
    };
  };

  useEffect(() => {
    let prevCpu = 20;
    let prevRam = 40;

    const fetchLogs = async () => {
      try {
        const dummyLog = generateDummyData(prevCpu, prevRam);

        let newStatus = null; // Store the new log status message

        if (dummyLog.cpu > cpuThreshold || dummyLog.ram > ramThreshold) {
          newStatus = `⚠️ [${new Date().toLocaleTimeString()}] System Scaled Up: CPU: ${dummyLog.cpu.toFixed(
            2
          )}%, RAM: ${dummyLog.ram.toFixed(2)}% exceeded thresholds!`;
          dummyLog.cpu = Math.max(cpuThreshold - 20, 5);
          dummyLog.ram = Math.max(cpuThreshold - 20, 5);
        } else {
          newStatus = `✅ [${new Date().toLocaleTimeString()}] System Normal: CPU: ${dummyLog.cpu.toFixed(
            2
          )}%, RAM: ${dummyLog.ram.toFixed(2)}% within thresholds.`;
        }

        prevCpu = dummyLog.cpu;
        prevRam = dummyLog.ram;

        // Add the new status to the top of the log list
        setStatusLogs((prevStatusLogs) => [newStatus, ...prevStatusLogs]);

        // Update logs and charts
        setLogs((prevLogs) => [...prevLogs.slice(-9), dummyLog]);
        setTimestamps((prev) => [...prev.slice(-9), new Date(dummyLog.timestamp).toLocaleTimeString()]);
        setCpuData((prev) => [...prev.slice(-9), dummyLog.cpu]);
        setRamData((prev) => [...prev.slice(-9), dummyLog.ram]);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, [cpuThreshold, ramThreshold]);

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
      {
        label: `CPU Threshold (${cpuThreshold}%)`,
        data: Array(cpuData.length).fill(cpuThreshold),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        tension: 0,
        fill: false,
        borderDash: [5, 5],
      },
    ],
  };

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
      {
        label: `RAM Threshold (${ramThreshold}%)`,
        data: Array(ramData.length).fill(ramThreshold),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        tension: 0,
        fill: false,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 text-white md:grid-cols-1 gap-8">
        {/* CPU Utilization Chart */}
        <div className="bg-black bg-opacity-30 p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">CPU Utilization</h2>
          <Line data={cpuChartData} options={options} />
        </div>

        {/* RAM Utilization Chart */}
        <div className="bg-black bg-opacity-30 p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">RAM Utilization</h2>
          <Line data={ramChartData} options={options} />
        </div>

        {/* Threshold Controls */}
        <div className="bg-black bg-opacity-30 p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Set CPU Threshold</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={cpuThreshold}
            onChange={(e) => setCpuThreshold(Number(e.target.value))}
            className="w-full"
          />
          <p>CPU Threshold: {cpuThreshold}%</p>
        </div>
        <div className="bg-black bg-opacity-30 p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Set RAM Threshold</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={ramThreshold}
            onChange={(e) => setRamThreshold(Number(e.target.value))}
            className="w-full"
          />
          <p>RAM Threshold: {ramThreshold}%</p>
        </div>
      </div>

      {/* Status Logs */}
      <div className="bg-black bg-opacity-40 h-96 overflow-y-scroll text-white p-4 mt-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 ">System Logs</h2>
        <ul>
          {statusLogs.map((log, index) => (
            <li key={index} className="mb-2 p-2 px-3 rounded-lg bg-white bg-opacity-10 ">
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Metricsfromec2;
