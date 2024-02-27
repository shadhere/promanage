import { useState } from "react";
import styles from "./ModernCard.module.css";
import Accordion from "./Accordion";
import ChecklistItem from "./ChecklistItem";

const ModernCard = ({ title, priority, checklist }) => {
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
        <button className={styles.button}>Button 1</button>
        <button className={styles.button}>Button 2</button>
        <button className={styles.button}>Button 3</button>
        <button className={styles.button}>Button 4</button>
      </div>
    </div>
  );
};

export default ModernCard;
