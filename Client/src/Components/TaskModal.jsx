import { useState } from "react";
import styles from "./TaskModal.module.css";
import deleteIcon from "../assets/deleteIcon.svg";
import addNewIcon from "../assets/addNewIcon.svg";
import DatePicker from "react-datepicker"; // Import the date picker component
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the date picker

const TaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("low");
  const [checklistItems, setChecklistItems] = useState([]);
  const [dueDate, setDueDate] = useState(null);

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      const newTask = {
        title: taskName,
        priority: priority,
        checklist: checklistItems,
        dueDate: dueDate ? dueDate.toLocaleDateString() : null, // Format due date as needed
      };
      onAddTask(newTask);
      setTaskName("");
      setPriority("low");
      setChecklistItems([]);
      setDueDate(null);
      onClose();
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
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
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
            <div className={styles.priorityContainer}>
              <label>Select Priority</label>
              <div className={styles.priorityTags}>
                <div
                  className={`${styles.priorityTag} ${
                    priority === "HIGH PRIORITY" && styles.active
                  }`}
                  onClick={() => handlePriorityChange("HIGH PRIORITY")}
                >
                  <div
                    className={styles.priorityDot}
                    style={{ backgroundColor: "red" }}
                  ></div>
                  HIGH PRIORITY
                </div>
                <div
                  className={`${styles.priorityTag} ${
                    priority === "MODERATE PRIORITY" && styles.active
                  }`}
                  onClick={() => handlePriorityChange("MODERATE PRIORITY")}
                >
                  <div
                    className={styles.priorityDot}
                    style={{ backgroundColor: "yellow" }}
                  ></div>
                  MODERATE PRIORITY
                </div>
                <div
                  className={`${styles.priorityTag} ${
                    priority === "LOW PRIORITY" && styles.active
                  }`}
                  onClick={() => handlePriorityChange("LOW PRIORITY")}
                >
                  <div
                    className={styles.priorityDot}
                    style={{ backgroundColor: "green" }}
                  ></div>
                  LOW PRIORITY
                </div>
              </div>
            </div>
            <div className={styles.checklistContainer}>
              <label htmlFor="checklist">Checklist:</label>
              <div className={styles.checklistItems}>
                <div className={styles.checklist}>
                  {checklistItems.map((item, index) => (
                    <div className={styles.checklistItem} key={index}>
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleChecklistItemChange(index)}
                      />
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) =>
                          handleChecklistItemInputChange(index, e.target.value)
                        }
                        placeholder="Enter checklist item"
                      />
                      <img
                        src={deleteIcon}
                        className={styles.deleteIcon}
                        onClick={() => handleDeleteChecklistItem(index)}
                      ></img>
                    </div>
                  ))}
                </div>
              </div>
              <div
                onClick={handleAddChecklistItem}
                className={styles.addNewBtn}
              >
                <img src={addNewIcon} className={styles.addNewIcon} />
                Add New
              </div>
            </div>
            <div className={styles.btnContainer}>
              <DatePicker
                selected={dueDate}
                onChange={setDueDate}
                dateFormat="MM/dd/yyyy"
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
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
