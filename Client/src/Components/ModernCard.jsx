import { useState } from "react";
import styles from "./ModernCard.module.css";
import Accordion from "./Accordion";
import ChecklistItem from "./ChecklistItem";
import moment from "moment";
import menuIcon from "../assets/menuIcon.svg";

const ModernCard = ({
  title,
  priority,
  description,
  checklist,
  onMove,
  dueDate,
  carrdId,
}) => {
  const formattedDueDate = moment(dueDate).format("MMM DD");
  const handleMove = (newStatus) => {
    console.log("Clicked Card ID:", carrdId);
    console.log("New Status:", newStatus); // Assuming the new status is "inProgress"
    // Call the onMove function passed from the parent component
    if (onMove) {
      onMove(carrdId, newStatus);
      console.log("Clicked Card ID:", carrdId);
      console.log("New Status:", newStatus);
    }
  };
  // Destructuring title and priority from props

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.priorityTag}>
          <div
            className={styles.priorityDot}
            style={{ backgroundColor: "red" }}
          ></div>
          {priority}
        </div>
        {/* Displaying priority */}
        <div className={styles.menu}>
          {/* Menu with three dots */}
          <img src={menuIcon} />
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <Accordion carrdId={carrdId}>
          {checklist.map((item, index) => (
            <ChecklistItem key={index} item={item} />
          ))}
        </Accordion>
      </div>
      <div className={styles.footer}>
        <div className={styles.date}>{formattedDueDate}</div>
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => handleMove("backlog")}
            className={styles.moveCardBtn}
          >
            BACKLOG
          </button>
          <button
            onClick={() => handleMove("todo")}
            className={styles.moveCardBtn}
          >
            TO-DO
          </button>
          <button
            onClick={() => handleMove("inProgress")}
            className={styles.moveCardBtn}
          >
            PROGRESS
          </button>
          <button
            onClick={() => handleMove("done")}
            className={styles.moveCardBtn}
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernCard;
