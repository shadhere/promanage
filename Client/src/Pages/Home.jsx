import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./Home.module.css";
import Kanban from "../Components/Kanban/Kanban";
import api from "../Api/api";
import { AccordionProvider } from "../Contexts/accordion";
import moment from "moment";
import MenuModal from "../Components/MenuModal/MenuModal";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState({ name: "" });

  const options = ["Today", "This Week", "This Month"];

  const currentDate = moment().format("Do MMM YYYY");

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
    const fetchUserData = async () => {
      try {
        const response = await api.get("/settings");
        const { name } = response.data;
        setUserData((prevData) => ({ ...prevData, name: name }));
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response) {
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetchTasks("thisWeek"); // Fetch tasks created today by default
  }, []);

  console.log("Tasks:", tasks); // Log the tasks to see the data structure
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Welcome! {userData.name}</h1>
          <div className={styles.currentDate}>{currentDate}</div>
        </div>
        <div className={styles.board}>
          <h1>Board</h1> <MenuModal options={options} fetchTasks={fetchTasks} />
        </div>
        <AccordionProvider>
          <Kanban tasks={tasks} fetchTasks={fetchTasks} />
        </AccordionProvider>
      </div>
    </div>
  );
};

export default Home;
