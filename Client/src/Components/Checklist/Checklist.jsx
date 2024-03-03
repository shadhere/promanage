import styles from "./Checklist.module.css";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import addNewIcon from "../../assets/addNewIcon.svg";

const Checklist = ({
  checklistItems = [], // Provide a default value for checklistItems
  handleChecklistItemChange,
  handleChecklistItemInputChange,
  handleDeleteChecklistItem,
  handleAddChecklistItem,
}) => {
  const completedItemsCount = checklistItems.filter(
    (item) => item.completed
  ).length;

  const checklistItemslength = checklistItems.length;
  return (
    <div className={styles.checklistContainer}>
      <label htmlFor="checklist">
        Checklist {completedItemsCount}/{checklistItemslength}
        <span style={{ color: "red", marginLeft: "5px" }}>*</span>
      </label>
      <div className={styles.checklistItems}>
        <div className={styles.checklist}>
          {/* Check if checklistItems is an array before mapping */}
          {Array.isArray(checklistItems) &&
            checklistItems.map((item, index) => (
              <ChecklistItem
                key={index}
                item={item}
                index={index}
                handleChecklistItemChange={handleChecklistItemChange}
                handleChecklistItemInputChange={handleChecklistItemInputChange}
                handleDeleteChecklistItem={handleDeleteChecklistItem}
              />
            ))}
        </div>
      </div>
      <div onClick={handleAddChecklistItem} className={styles.addNewBtn}>
        <img src={addNewIcon} className={styles.addNewIcon} alt="Add new" />
        Add New
      </div>
    </div>
  );
};

export default Checklist;
