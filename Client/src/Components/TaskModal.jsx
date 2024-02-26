import { useState } from "react";
import styles from "./TaskModal.module.css";
import deleteIcon from "../assets/deleteIcon.svg";
import addNewIcon from "../assets/addNewIcon.svg";

const TaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("low");
  const [checklistItems, setChecklistItems] = useState([]);

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      const newTask = {
        title: taskName,
        priority: priority,
        checklist: checklistItems,
      };
      onAddTask(newTask);
      setTaskName("");
      setPriority("low");
      setChecklistItems([]);
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
            <label>Title</label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter Task Title"
            />
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
              <div
                onClick={handleAddChecklistItem}
                className={styles.addNewBtn}
              >
                <img src={addNewIcon} alt="" />
                Add New
              </div>
            </div>
            <div className={styles.btnContainer}>
              <button onClick={handleAddTask} className={styles.dateBtn}>
                Select Due Date
              </button>
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
