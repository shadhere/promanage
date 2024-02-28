import styles from "./Checklist.module.css";
import ChecklistItem from "./ChecklistItem";
import addNewIcon from "../assets/addNewIcon.svg";

const Checklist = ({
  checklistItems,
  handleChecklistItemChange,
  handleChecklistItemInputChange,
  handleDeleteChecklistItem,
  handleAddChecklistItem,
}) => {
  return (
    <div className={styles.checklistContainer}>
      <label htmlFor="checklist">Checklist:</label>
      <div className={styles.checklistItems}>
        <div className={styles.checklist}>
          {checklistItems.map((item, index) => (
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