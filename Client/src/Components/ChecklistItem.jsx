import styles from "./TaskModal.module.css";
import deleteIcon from "../assets/deleteIcon.svg";

const ChecklistItem = ({
  item,
  index,
  handleChecklistItemChange,
  handleChecklistItemInputChange,
  handleDeleteChecklistItem,
}) => {
  return (
    <div className={styles.checklistItem}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => handleChecklistItemChange(index)}
      />
      <input
        type="text"
        value={item.text}
        onChange={(e) => handleChecklistItemInputChange(index, e.target.value)}
        placeholder="Enter checklist item"
      />
      <img
        src={deleteIcon}
        className={styles.deleteIcon}
        alt="Delete"
        onClick={() => handleDeleteChecklistItem(index)}
      />
    </div>
  );
};

export default ChecklistItem;
