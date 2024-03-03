import styles from "../../Components/TaskModal/TaskModal.module.css";
import deleteIcon from "../../assets/deleteIcon.svg";
import TextareaAutosize from "react-textarea-autosize";

const ChecklistItem = ({
  item,
  index,
  handleChecklistItemChange,
  handleChecklistItemInputChange,
  handleDeleteChecklistItem,
  showIcon = true,
}) => {
  return (
    <div className={styles.checklistItem}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => handleChecklistItemChange(index)}
      />
      <TextareaAutosize
        id="myTextarea"
        rows={1}
        value={item.text}
        onChange={(e) => handleChecklistItemInputChange(index, e.target.value)}
        placeholder="Enter checklist item"
      />
      {showIcon && (
        <img
          src={deleteIcon}
          className={styles.deleteIcon}
          alt="Delete"
          onClick={() => handleDeleteChecklistItem(index)}
        />
      )}
    </div>
  );
};

export default ChecklistItem;
