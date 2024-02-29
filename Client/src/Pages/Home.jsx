import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./Home.module.css";
import Kanban from "../Components/Kanban";
import api from "../Api/api";
import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client"; // Import the Socket.IO client library

const Home = () => {
  const socket = io("http://localhost:5000"); // Replace with your server URL

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

  useEffect(() => {
    console.log("Component mounted");
    // Listen for 'taskUpdated' event from the server
    socket.on("taskUpdated", (updatedTask) => {
      // Update the tasks state with the updated task
      setTasks((prevTasks) => {
        // Find the index of the updated task in the tasks array
        const updatedTaskIndex = prevTasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (updatedTaskIndex !== -1) {
          console.log("updatedtask", updatedTask);
          // If the task is found, update it in the tasks array
          const updatedTasks = [...prevTasks];
          updatedTasks[updatedTaskIndex] = updatedTask;
          return updatedTasks;
        } else {
          // If the task is not found (possibly a new task), add it to the tasks array
          return [...prevTasks, updatedTask];
        }
      });
      return () => {
        console.log("Component will unmount");
        socket.disconnect();
      };
    });
  }, []);
  // Set up Socket.io connection

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
