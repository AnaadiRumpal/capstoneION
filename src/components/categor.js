import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion, AnimatePresence } from "framer-motion";


dayjs.extend(relativeTime);

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Categor = () => {
  const [tickets, setTickets] = useState([
    { id: 1, priority: "P1", timestamp: "2024-03-07T03:14:15", message: "Critical issue occurred", summary: "Client chat 1 here" },
    { id: 2, priority: "P2", timestamp: "2024-03-07T03:15:10", message: "Warning issue detected", summary: "Client chat 2 here" },
    { id: 3, priority: "P3", timestamp: "2024-03-07T03:20:05", message: "Informational message", summary: "Client chat 3 here" },
    { id: 4, priority: "P1", timestamp: "2024-03-07T03:22:30", message: "Another critical issue", summary: "Client chat 4 here" },
    { id: 5, priority: "P4", timestamp: "2024-03-07T03:25:45", message: "Low priority issue", summary: "Client chat 5 here" },
  ]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("P1");

  const priorities = ["P1", "P2", "P3", "P4"];
  const priorityCounts = priorities.map(
    (priority) => tickets.filter((ticket) => ticket.priority === priority).length
  );

  const chartData = {
    labels: priorities,
    datasets: [
      {
        data: priorityCounts,
        backgroundColor: ["#ff6384", "#ffcd56", "#36a2eb", "#4bc0c0"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
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
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedPriority(priorities[index]);
      }
    },
  };

  const fetchTickets = () => {
    const newTicket = {
      id: tickets.length + 1,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      timestamp: dayjs().toISOString(),
      message: "Randomly generated ticket",
      summary: "Random client chat",
    };
    setTickets((prevTickets) => [...prevTickets, newTicket]);
  };

  useEffect(() => {
    const interval = setInterval(fetchTickets, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredTickets = selectedPriority
    ? tickets.filter((ticket) => ticket.priority === selectedPriority)
    : tickets;

  const sortedTickets = tickets.sort((a, b) =>
    dayjs(b.timestamp).isAfter(dayjs(a.timestamp)) ? 1 : -1
  );

  const lastTicket = sortedTickets[0];
  const timeSinceLastTicket = lastTicket
    ? dayjs(lastTicket.timestamp).fromNow()
    : "No tickets yet";

  const showOverlay = (ticket) => setSelectedTicket(ticket);
  const hideOverlay = () => setSelectedTicket(null);
  return (
    <div className="grid gap-4 w-full sm:grid-cols-2 grid-cols-1">
      <div className="w-full p-6 bg-black bg-opacity-40 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">All Tickets</h2>
        <p className="text-gray-300 w-full flex flex-row justify-between text-sm mt-2">
          <span className="text-gray-100">Last ticket raised:</span>
          <span className="text-lg font-extrabold text-white">{timeSinceLastTicket}</span>
        </p>
        <p className="text-gray-300 w-full flex flex-row justify-between text-sm mt-2">
          <span className="text-gray-100">Total tickets raised:</span>
          <span className="text-lg font-extrabold text-white">{tickets.length}</span>
        </p>
        {/* Ticket list container with scrollable feature */}
        <div className="space-y-4 mt-6 h-full">
          <AnimatePresence>
            {sortedTickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`log-entry bg-white bg-opacity-5 drop-shadow-xl border-l-4 ${
                  ticket.priority === "P1"
                    ? "border-l-red-500"
                    : ticket.priority === "P2"
                    ? "border-l-yellow-500"
                    : ticket.priority === "P3"
                    ? "border-l-blue-500"
                    : "border-l-green-500"
                } p-4 rounded-2xl shadow-md`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">{dayjs(ticket.timestamp).format("DD/MM/YYYY HH:mm:ss")}</span>
                  <span
                    className={`text-sm font-semibold ${
                      ticket.priority === "P1"
                        ? "text-red-500"
                        : ticket.priority === "P2"
                        ? "text-yellow-500"
                        : ticket.priority === "P3"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-gray-200">{ticket.message}</p>
                <button
                  onClick={() => showOverlay(ticket)}
                  className="mt-2 text-xs px-3 p-2 rounded-full bg-white bg-opacity-20"
                >
                  Details
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      

      


      <div className="w-full p-6 bg-black bg-opacity-40 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Ticket Priorities</h2>
        <Bar data={chartData} options={chartOptions} />

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedPriority ? `Tickets with ${selectedPriority} Priority` : "All Tickets"}
          </h2>

          <div className="space-y-4">
            
            {filteredTickets.length === 0 ? (
              <p className="text-gray-400">No tickets found for the selected priority.</p>
            ) : (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`log-entry bg-white bg-opacity-5 drop-shadow-xl border-l-4 ${
                    ticket.priority === "P1"
                      ? "border-l-red-500"
                      : ticket.priority === "P2"
                      ? "border-l-yellow-500"
                      : ticket.priority === "P3"
                      ? "border-l-blue-500"
                      : "border-l-green-500"
                  } p-4 rounded-xl shadow-md`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">{dayjs(ticket.timestamp).format("DD/MM/YYYY HH:mm:ss")}</span>
                    <span
                      className={`text-sm font-semibold ${
                        ticket.priority === "P1"
                          ? "text-red-500"
                          : ticket.priority === "P2"
                          ? "text-yellow-500"
                          : ticket.priority === "P3"
                          ? "text-blue-500"
                          : "text-green-500"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-gray-200">{ticket.message}</p>
                  <button
                    onClick={() => showOverlay(ticket)}
                    className="mt-2 text-xs px-3 p-2 rounded-full bg-white bg-opacity-20"
                  >
                    Details
                  </button>
                </div>
              ))
            )}

          </div>

        </div>
      </div>
      {/* Overlay */}
      {selectedTicket && (
        <div className="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50  flex justify-center items-center">
          <motion.div
            className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-lg"
            initial={{ y: "150%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h2 className="text-2xl font-semibold mb-4">Ticket Details</h2>
            <p className="mb-2">
              <strong className="text-gray-300">Timestamp:</strong> {dayjs(selectedTicket.timestamp).format("DD/MM/YYYY HH:mm:ss")}
            </p>
            <p className="mb-2">
              <strong className="text-gray-300">Message:</strong> {selectedTicket.message}
            </p>
            <p className="mb-4">
              <strong className="text-gray-300">Suggestion For Dev:</strong> {selectedTicket.summary}
            </p>
            <button
              onClick={hideOverlay}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Close
            </button>
            </motion.div>
        </div>
      )}
    </div>
  );
};

export default Categor;






      

