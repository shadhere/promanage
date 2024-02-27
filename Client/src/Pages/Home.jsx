import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./Home.module.css";
import Kanban from "../Components/Kanban";
import api from "../Api/api";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch task data based on user ID
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks"); // Use the api instance to make a GET request
        setTasks(response.data);
        console.log(response.data);
        console.log("Tasks fetched successfully", response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks(); // Fetch tasks when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Welcome to the homepage</h1>
        <h1>Board</h1>
        <Kanban tasks={tasks} />
      </div>
    </div>
  );
};

export default Home;
