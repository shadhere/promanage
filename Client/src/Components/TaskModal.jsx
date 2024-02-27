import { useState } from "react";
import Modal from "./Modal";
import PrioritySelector from "./PrioritySelector";
import Checklist from "./Checklist";
import styles from "./TaskModal.module.css";
import DatePicker from "react-datepicker"; // Import the date picker component
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the date picker
import api from "../Api/api";

const TaskModal = ({ isOpen, onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("low");
  const [checklistItems, setChecklistItems] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState("todo");

  const handleAddTask = async () => {
    try {
      const newTask = {
        title: taskName,
        priority: priority,
        checklist: checklistItems,
        dueDate: dueDate ? dueDate.toLocaleDateString() : null,
        status: status,
      };
      const response = await api.post("/task", newTask);
      if (response.status === 201) {
        setTaskName("");
        setPriority("low");
        setChecklistItems([]);
        setDueDate(null);
        setStatus("todo");
        onClose();
        console.log("Task added successfully");
      } else {
        console.error("Failed to add task:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handlePriorityChange = (selectedPriority) => {
    setPriority(selectedPriority);
  };

  const handleChecklistItemChange = (index) => {
    const updatedChecklist = [...checklistItems];
    updatedChecklist[index].completed = !updatedChecklist[index].completed;
    setChecklistItems(updatedChecklist);
  };

  const handleChecklistItemInputChange = (index, value) => {
    const updatedChecklist = [...checklistItems];
    updatedChecklist[index].text = value;
    setChecklistItems(updatedChecklist);
  };

  const handleDeleteChecklistItem = (index) => {
    const updatedChecklist = [...checklistItems];
    updatedChecklist.splice(index, 1);
    setChecklistItems(updatedChecklist);
  };

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { text: "", completed: false }]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <label>Title</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter Task Title"
        />
      </div>
      <PrioritySelector
        priority={priority}
        handlePriorityChange={handlePriorityChange}
      />
      <Checklist
        checklistItems={checklistItems}
        handleChecklistItemChange={handleChecklistItemChange}
        handleChecklistItemInputChange={handleChecklistItemInputChange}
        handleDeleteChecklistItem={handleDeleteChecklistItem}
        handleAddChecklistItem={handleAddChecklistItem}
      />
      <div className={styles.btnContainer}>
        <DatePicker
          selected={dueDate}
          onChange={setDueDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select due date"
          className={styles.datePicker} // Add className for styling
        />

        <button onClick={onClose} className={styles.cancelBtn}>
          Cancel
        </button>
        <button onClick={handleAddTask} className={styles.saveBtn}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default TaskModal;
