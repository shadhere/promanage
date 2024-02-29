import React, { useState, useEffect } from "react";
import styles from "./Kanban.module.css";
import collapseAllIcon from "../assets/collapseAllIcon.svg";
import addTaskIcon from "../assets/addTaskIcon.svg";
import ModernCard from "./ModernCard"; // Import the ModernCard component
import TaskModal from "./TaskModal"; // Import the modal component
import api from "../Api/api";
import io from "socket.io-client";

const Kanban = ({ tasks }) => {
  // Destructuring tasks from props
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onMove = async (carrdId, newStatus) => {
    try {
      console.log("Card ID:", carrdId, " newStatus:", newStatus);
      // Make update request to server to move the card
      const response = await api.put(`/tasks/${carrdId}`, { newStatus });
      const movedTask = response.data;
      console.log("Updated api Task:", movedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.kanbanBoard}>
      <div className={styles.column}>
        <h2 className={styles.columnTitle}>
          {" "}
          Backlog
          <img
            src={collapseAllIcon}
            alt="Backlog Icon"
            className={styles.icon}
          />{" "}
        </h2>
        <div className={styles.tasks}>
          {tasks
            .filter((task) => task.status === "backlog")
            .map((task) => (
              <ModernCard
                key={task._id}
                carrdId={task._id} // Assuming _id is unique for each task
                title={task.title}
                priority={task.priority} // Assuming priority is another property of the task
                description={task.description} // Assuming you have a description property
                checklist={task.checklist}
                onMove={onMove} // Assuming you have a description property
              />
            ))}
        </div>
      </div>
      <div className={styles.column}>
        <h2 className={styles.columnTitle}>
          To Do{" "}
          <div className={styles.iconsContainer}>
            <img
              src={addTaskIcon}
              alt="Image 1"
              className={styles.addIcon}
              onClick={toggleModal}
            />
            <img src={collapseAllIcon} alt="Image 2" className={styles.icon} />
          </div>{" "}
        </h2>
        <div className={styles.tasks}>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <ModernCard
                key={task._id}
                carrdId={task._id} // Assuming _id is unique for each task
                title={task.title}
                priority={task.priority} // Assuming priority is another property of the task
                description={task.description} // Assuming you have a description property
                checklist={task.checklist}
                onMove={onMove} // Pass moveCard function to ModernCard
              />
            ))}
        </div>
      </div>
      <div className={styles.column}>
        <h2 className={styles.columnTitle}>
          In Progress{" "}
          <img
            src={collapseAllIcon}
            alt="Backlog Icon"
            className={styles.icon}
          />{" "}
        </h2>
        <div className={styles.tasks}>
          {tasks
            .filter((task) => task.status === "inProgress")
            .map((task) => (
              <ModernCard
                key={task._id}
                carrdId={task._id} // Assuming _id is unique for each task
                title={task.title}
                priority={task.priority} // Assuming priority is another property of the task
                description={task.description} // Assuming you have a description property
                checklist={task.checklist}
                onMove={onMove}
              />
            ))}
        </div>
      </div>
      <div className={styles.column}>
        <h2 className={styles.columnTitle}>
          Done{" "}
          <img
            src={collapseAllIcon}
            alt="Backlog Icon"
            className={styles.icon}
          />{" "}
        </h2>
        <div className={styles.tasks}>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <ModernCard
                key={task._id}
                carrdId={task._id} // Assuming _id is unique for each task
                title={task.title}
                priority={task.priority} // Assuming priority is another property of the task
                description={task.description} // Assuming you have a description property
                checklist={task.checklist}
                onMove={onMove} // Assuming you have a description property
              />
            ))}
        </div>
      </div>
      <TaskModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default Kanban;
