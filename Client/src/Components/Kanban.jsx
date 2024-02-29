import React, { useState } from "react";
import KanbanColumn from "../Components/KanbanColumn";
import TaskModal from "./TaskModal"; // Import the modal component
import api from "../Api/api";
import styles from "./Kanban.module.css";
import { useAccordionContext } from "../Contexts/accordion";

const Kanban = ({ tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { collapseAllForBoard } = useAccordionContext();

  const handleCollapseAllForBoard = (boardName) => {
    collapseAllForBoard(boardName);
  };

  const onMove = async (carrdId, newStatus) => {
    try {
      console.log("Card ID:", carrdId, " newStatus:", newStatus);
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
      <KanbanColumn
        title="Backlog"
        tasks={tasks.filter((task) => task.status === "backlog")}
        onMove={onMove}
        handleCollapseAllForBoard={handleCollapseAllForBoard("backlog")}
        boardName="backlog"
      />
      <KanbanColumn
        title="To Do"
        tasks={tasks.filter((task) => task.status === "todo")}
        onMove={onMove}
        handleCollapseAllForBoard={handleCollapseAllForBoard("todo")}
        boardName="todo"
        toggleModal={toggleModal}
      />
      <KanbanColumn
        title="In Progress"
        tasks={tasks.filter((task) => task.status === "inProgress")}
        onMove={onMove}
        handleCollapseAllForBoard={handleCollapseAllForBoard("inProgress")}
        boardName="inProgress"
      />
      <KanbanColumn
        title="Done"
        tasks={tasks.filter((task) => task.status === "done")}
        onMove={onMove}
        handleCollapseAllForBoard={handleCollapseAllForBoard("done")}
        boardName="done"
      />
      <TaskModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default Kanban;
