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
  toggleModal,
  dueDate,
  onDelete,
  carrdId,
  handleTaskDelete,
  handleEditTask,
}) => {
  const formattedDueDate = moment(dueDate).format("MMM DD");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

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

  const handleDelete = () => {
    handleTaskDelete(carrdId);
  };

  const handleEdit = () => {
    handleEditTask(carrdId);

    toggleModal();
  };

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
        <div className={styles.menu}>
          <img src={menuIcon} alt="Menu" onClick={handleMenuClick}></img>
          {isMenuOpen && (
            <div className={styles.menuModal}>
              <div className={styles.menuOptions}>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
                <button>Share</button>
              </div>
              <button onClick={handleCloseMenu}>Close Menu</button>
            </div>
          )}
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
