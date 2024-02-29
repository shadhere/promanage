import { useState } from "react";
import styles from "./ModernCard.module.css";
import Accordion from "./Accordion";
import ChecklistItem from "./ChecklistItem";

const ModernCard = ({
  title,
  priority,
  description,
  checklist,
  onMove,
  carrdId,
}) => {
  const handleMove = (carrdId, newStatus) => {
    console.log("Clicked Card ID:", carrdId);
    console.log("New Status:", newStatus); // Assuming the new status is "inProgress"
    // Call the onMove function passed from the parent component
    if (onMove) {
      onMove(carrdId, newStatus);
    }
  };
  // Destructuring title and priority from props
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.priority}>{priority}</div>{" "}
        {/* Displaying priority */}
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.menu}>
          {/* Menu with three dots */}
          <div className={styles.menuIcon}></div>
          <div className={styles.menuIcon}></div>
          <div className={styles.menuIcon}></div>
        </div>
      </div>
      <div className={styles.content}>
        <Accordion
          title="To Do"
          expanded={isExpanded}
          onToggle={toggleAccordion}
        >
          {checklist.map((item, index) => (
            <ChecklistItem key={index} item={item} />
          ))}
        </Accordion>
      </div>
      <div className={styles.footer}>
        <button onClick={() => handleMove("backlog")}>To Backlog</button>
        <button onClick={() => handleMove("todo")}>To To Do</button>
        <button onClick={() => handleMove("inProgress")}>To In Progress</button>
        <button onClick={() => handleMove("done")}>To Done</button>
      </div>
    </div>
  );
};

export default ModernCard;
