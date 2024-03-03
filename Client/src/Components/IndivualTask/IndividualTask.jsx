import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../../Api/api";
import styles from "./IndividualTask.module.css";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import moment from "moment";
import codesandboxIcon from "../../assets/codesandboxIcon.svg";

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

  const completedItemsCount = task.checklist.filter(
    (item) => item.completed
  ).length;

  const formattedDueDate = moment(task.dueDate).format("MMM DD");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH PRIORITY":
        return "#FF2473";
      case "MODERATE PRIORITY":
        return "#18B0FF";
      case "LOW PRIORITY":
        return "#63C05B";
      default:
        return "gray";
    }
  };

  // Render the task details
  return (
    <>
      {" "}
      <div className={styles.taskPage}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>
            <img src={codesandboxIcon} alt="Logo" />
            <h1>Pro Manage</h1>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={styles.priorityTag}>
                <div
                  className={styles.priorityDot}
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                ></div>
                {task.priority}
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{task.title}</h3>
            </div>
            <div className={styles.checklistCount}>
              Checklist ({completedItemsCount}/{task.checklist.length})
            </div>
            <div className={styles.checklistItems}>
              <div className={styles.checklist}>
                {Array.isArray(task.checklist) &&
                  task.checklist.map((item, index) => (
                    <ChecklistItem
                      key={index}
                      item={item}
                      index={index}
                      showIcon={false}
                    />
                  ))}
              </div>
            </div>
            {task.dueDate && (
              <div className={styles.footer}>
                <span>Due Date</span>
                <div className={styles.date}>{formattedDueDate}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskPage;
