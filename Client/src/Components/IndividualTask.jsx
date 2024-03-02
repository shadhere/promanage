import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../Api/api";
import styles from "./IndividualTask.module.css";

/**
 * TaskPage component for displaying a single task
 */
const TaskPage = () => {
  // State to hold the task data
  const [task, setTask] = useState();
  // Extract the task ID from the URL
  const { id } = useParams();

  // Fetch the task data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Fetch task data from the API
   */
  const fetchData = async () => {
    try {
      // Make a GET request to retrieve the task data
      const { data: responseData } = await api.get(`/tasks/${id}`);
      // Log the response data for debugging
      console.log("Response data:", responseData);
      // Set the task state with the retrieved data
      setTask(responseData);
      // Log the current task state for debugging
      console.log("Task:", task);
    } catch (error) {
      // Log an error message if the task data fetch fails
      console.error("Error fetching task:", error);
      // Optionally, set an error state to display an error message to the user
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  // Render the task details
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.priorityTag}>
            <div
              className={styles.priorityDot}
              style={{ backgroundColor: "red" }}
            ></div>
            {/* Display the task priority */}
            {task.priority}
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{task.title}</h3>
          {/* Accordion component or any other component removed */}
        </div>
        <div className={styles.footer}>
          <div className={styles.date}>{task.dueDate}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
