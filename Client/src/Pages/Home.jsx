import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./Home.module.css";
import Kanban from "../Components/Kanban";
import api from "../Api/api";
import { AccordionProvider } from "../Contexts/accordion";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (timeframe) => {
    try {
      const response = await api.get(`/tasks?timeframe=${timeframe}`);
      setTasks(response.data.tasksByStatus);
      console.log("Tasks fetched successfully", response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks("thisWeek"); // Fetch tasks created today by default
  }, []);

  console.log("Tasks:", tasks); // Log the tasks to see the data structure
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Welcome to the homepage</h1>
        </div>
        <div className={styles.board}>
          <h1>Board</h1>{" "}
          <select
            onChange={(e) => fetchTasks(e.target.value)}
            className={styles.select}
          >
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
          </select>
        </div>
        <AccordionProvider>
          <Kanban tasks={tasks} fetchTasks={fetchTasks} />
        </AccordionProvider>
      </div>
    </div>
  );
};

export default Home;
