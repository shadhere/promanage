import Modal from "./Modal";
import PrioritySelector from "./PrioritySelector";
import Checklist from "./Checklist";
import styles from "./TaskModal.module.css";
import DatePicker from "react-datepicker"; // Import the date picker component
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the date picker

const TaskModal = ({
  isOpen,
  onClose,
  fetchTasks,
  handleAddTask,
  handleChecklistItemInputChange,
  handleChecklistItemChange,
  handleDeleteChecklistItem,
  handleAddChecklistItem,
  handleFieldChange,
  taskState,
  handleUpdateTask,
}) => {
  const isEditing = taskState._id; // Check if taskState contains an id (indicating editing)

  console.log("isEditing:", taskState._id);
  // Function to handle task save or update based on editing state
  const handleSaveOrUpdate = () => {
    if (isEditing) {
      handleUpdateTask(taskState.id); // Call update function if editing
    } else {
      handleAddTask(); // Otherwise, call add function
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <label>Title</label>
        <input
          type="text"
          id="taskName"
          value={taskState.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          placeholder="Enter Task Title"
        />
      </div>
      <PrioritySelector
        priority={taskState.priority}
        handlePriorityChange={(priority) =>
          handleFieldChange("priority", priority)
        }
      />
      <Checklist
        checklistItems={taskState.checklist}
        handleChecklistItemChange={handleChecklistItemChange}
        handleChecklistItemInputChange={handleChecklistItemInputChange}
        handleDeleteChecklistItem={handleDeleteChecklistItem}
        handleAddChecklistItem={handleAddChecklistItem}
      />
      <div className={styles.btnContainer}>
        <DatePicker
          selected={taskState.dueDate}
          onChange={(date) => handleFieldChange("dueDate", date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select due date"
          className={styles.datePicker} // Add className for styling
        />

        <button onClick={onClose} className={styles.cancelBtn}>
          Cancel
        </button>
        <button onClick={handleSaveOrUpdate} className={styles.saveBtn}>
          {isEditing ? "Update" : "Save"} {/* Conditional button label */}
        </button>
      </div>
    </Modal>
  );
};

export default TaskModal;
