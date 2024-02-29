import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./Home.module.css";
import Kanban from "../Components/Kanban";
import api from "../Api/api";
import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client"; // Import the Socket.IO client library
import { AccordionProvider } from "../Contexts/accordion";

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
    socket.on(
      "taskUpdated",
      (newTask) => {
        console.log(" wbg listening for updatedTask", newTask);

        return setTasks((prevTasks) => {
          return [...prevTasks, newTask]; // Add the new task to the end of the array
        });
      },
      []
    );

    return () => {
      console.log("Component will unmount");
      socket.disconnect();
    };
  });

  useEffect(() => {
    // Listen for task status update events from the server
    socket.on(
      "taskStatusUpdated",
      (updatedTask) => {
        setTasks((prevTasks) => {
          console.log("status update", updatedTask);
          // Map over the tasks array and replace the updated task
          const updatedTasks = prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          );
          return updatedTasks;
        });
      },
      []
    );

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("taskStatusUpdated");
    };
  });

  // Dependency array includes 'socket' to ensure the effect runs when 'socket' changes

  // Set up Socket.io connection

  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Welcome to the homepage</h1>
        <h1>Board</h1>
        <AccordionProvider>
          <Kanban tasks={tasks} />
        </AccordionProvider>
      </div>
    </div>
  );
};

export default Home;
