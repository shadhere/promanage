import { useState } from "react";
import styles from "./Kanban.module.css";
import collapseAllIcon from "../assets/collapseAllIcon.svg";
import addTaskIcon from "../assets/addTaskIcon.svg";
import ModernCard from "./ModernCard"; // Import the ModernCard component
import TaskModal from "./TaskModal"; // Import the modal component

const Kanban = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Description of Task 1",
      status: "todo",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description of Task 2",
      status: "inProgress",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description of Task 3",
      status: "done",
    },
  ]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddTask = (status, taskName) => {
    if (taskName) {
      const newTask = {
        id: Date.now(),
        title: taskName,
        description: "",
        status: status,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
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
                key={task.id}
                title={task.title}
                description={task.description}
              />
            ))}
        </div>
        <button
          className={styles.addButton}
          onClick={() => handleAddTask("backlog")}
        >
          Add Task
        </button>
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
                key={task.id}
                title={task.title}
                description={task.description}
              />
            ))}
        </div>
        <button
          className={styles.addButton}
          onClick={() => handleAddTask("todo")}
        >
          Add Task
        </button>
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
                key={task.id}
                title={task.title}
                description={task.description}
              />
            ))}
        </div>
        <button
          className={styles.addButton}
          onClick={() => handleAddTask("inProgress")}
        >
          Add Task
        </button>
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
                key={task.id}
                title={task.title}
                description={task.description}
              />
            ))}
        </div>
        <button
          className={styles.addButton}
          onClick={() => handleAddTask("done")}
        >
          Add Task
        </button>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onAddTask={(taskName) => handleAddTask("todo", taskName)}
      />
    </div>
  );
};

export default Kanban;
