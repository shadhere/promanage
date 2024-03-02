import React, { useState } from "react";
import KanbanColumn from "../Components/KanbanColumn";
import TaskModal from "./TaskModal"; // Import the modal component
import api from "../Api/api";
import styles from "./Kanban.module.css";
import { useAccordionContext } from "../Contexts/accordionUtils";

const Kanban = ({ tasks, fetchTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { collapseAllForBoard } = useAccordionContext();
  const [taskState, setTaskState] = useState({
    title: "",
    priority: "low",
    checklist: [],
    dueDate: null,
    status: "todo",
  });

  const handleAddTask = async () => {
    try {
      const newTask = {
        title: taskState.title,
        priority: taskState.priority,
        checklist: taskState.checklist,
        dueDate: taskState.dueDate
          ? taskState.dueDate.toLocaleDateString()
          : null,
        status: "todo",
      };

      const response = await api.post("/task", newTask);

      if (response.status === 201) {
        setTaskState({
          title: "",
          priority: "low",
          checklist: [],
          dueDate: null,
          status: "todo",
        });
        toggleModal();
        fetchTasks();
        console.log("Task added successfully");
      } else {
        console.error("Failed to add task:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleFieldChange = (field, value) => {
    setTaskState({ ...taskState, [field]: value });
  };

  const handleChecklistItemChange = (index) => {
    const updatedChecklist = [...taskState.checklist];
    updatedChecklist[index].completed = !updatedChecklist[index].completed;
    setTaskState({ ...taskState, checklist: updatedChecklist });
  };

  const handleChecklistItemInputChange = (index, value) => {
    const updatedChecklist = [...taskState.checklist];
    updatedChecklist[index].text = value;
    setTaskState({ ...taskState, checklist: updatedChecklist });
  };

  const handleDeleteChecklistItem = (index) => {
    const updatedChecklist = [...taskState.checklist];
    updatedChecklist.splice(index, 1);
    setTaskState({ ...taskState, checklist: updatedChecklist });
  };

  const handleAddChecklistItem = () => {
    setTaskState((prevState) => ({
      ...prevState,
      checklist: [
        ...(prevState.checklist || []),
        { text: "", completed: false },
      ],
    }));
  };

  const handleCollapseAllForBoard = (boardName) => {
    collapseAllForBoard(boardName);
    console.log("collapsed board:", boardName);
  };

  const onMove = async (carrdId, newStatus) => {
    try {
      console.log("Card ID:", carrdId, " newStatus:", newStatus);
      const response = await api.put(`/tasks/${carrdId}`, { newStatus });
      const movedTask = response.data;
      console.log("Updated api Task:", movedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleTaskDelete = async (carrdId) => {
    try {
      await api.delete(`/tasks/${carrdId}`);
      fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleModal = () => {
    if (!isModalOpen) {
      setTaskState("");
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleEditTask = async (carrdId) => {
    try {
      const response = await api.get(`/tasks/${carrdId}`);
      console.log("carrd ID:", carrdId);
      const updatedTask = response.data;
      console.log("Updated Task:", updatedTask);
      setTaskState(updatedTask);
      // Update the task in the state or perform any other necessary actions
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          "Request failed with status code:",
          error.response.status
        );
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
      console.error("Error updating task:", error);
    }
  };

  const handleUpdateTask = async (carrdId) => {
    try {
      const response = await api.put(`/tasks/${carrdId}`, taskState);
      if (response.status === 200) {
        console.log("Task updated successfully");
        toggleModal(); // Close the modal after updating task
        fetchTasks(); // Refresh tasks after updating
      } else {
        console.error("Failed to update task:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className={styles.kanbanBoard}>
      <KanbanColumn
        title="Backlog"
        tasks={tasks.backlog || []}
        onMove={onMove}
        toggleModal={toggleModal}
        handleCollapseAllForBoard={() => handleCollapseAllForBoard("backlog")}
        boardName="backlog"
        handleEditTask={handleEditTask}
        handleTaskDelete={handleTaskDelete} // Pass the delete function to the column
      />
      <KanbanColumn
        title="To Do"
        tasks={tasks.todo || []}
        onMove={onMove}
        handleCollapseAllForBoard={() => handleCollapseAllForBoard("todo")}
        boardName="todo"
        toggleModal={toggleModal}
        handleEditTask={handleEditTask}
        handleTaskDelete={handleTaskDelete} // Pass the delete function to the column
      />
      <KanbanColumn
        title="In Progress"
        tasks={tasks.inProgress || []}
        onMove={onMove}
        toggleModal={toggleModal}
        handleTaskDelete={handleTaskDelete} // Pass the delete function to the column
        handleCollapseAllForBoard={() =>
          handleCollapseAllForBoard("inProgress")
        }
        boardName="inProgress"
        handleEditTask={handleEditTask}
      />
      <KanbanColumn
        title="Done"
        tasks={tasks.done || []}
        onMove={onMove}
        toggleModal={toggleModal}
        handleTaskDelete={handleTaskDelete} // Pass the delete function to the column
        handleCollapseAllForBoard={() => handleCollapseAllForBoard("done")}
        boardName="done"
        handleEditTask={handleEditTask}
      />
      <TaskModal
        isOpen={isModalOpen}
        handleAddTask={handleAddTask}
        handleFieldChange={handleFieldChange}
        handleAddChecklistItem={handleAddChecklistItem}
        handleDeleteChecklistItem={handleDeleteChecklistItem}
        onClose={toggleModal}
        handleChecklistItemChange={handleChecklistItemChange}
        handleChecklistItemInputChange={handleChecklistItemInputChange}
        fetchTasks={fetchTasks}
        taskState={taskState}
        handleUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

export default Kanban;
