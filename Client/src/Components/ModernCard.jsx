import { useState } from "react";
import styles from "./ModernCard.module.css";
import Accordion from "./Accordion";

const ModernCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.tag}>Tag</div>
        <h3 className={styles.title}>Card Title</h3>
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
          {/* Content for the accordion */}
          <div className={styles.todoItem}>
            <input type="checkbox" />
            <span>Task 1</span>
          </div>
          <div className={styles.todoItem}>
            <input type="checkbox" />
            <span>Task 2</span>
          </div>
          {/* Add more tasks as needed */}
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
