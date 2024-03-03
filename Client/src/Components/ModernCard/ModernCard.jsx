import { useState, useEffect, useRef } from "react";
import styles from "./ModernCard.module.css";
import Accordion from "../Accordion/Accordion";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import menuIcon from "../../assets/menuIcon.svg";
import DeleteModal from "../DeleteModal/DeleteModal";

const ModernCard = ({
  title,
  priority,
  description,
  checklist,
  onMove,
  toggleModal,
  dueDate,
  onDelete,
  boardName,
  carrdId,
  handleTaskDelete,
  handleEditTask,
}) => {
  const formattedDueDate = moment(dueDate).format("MMM Do");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openDeleteModal = () => {
    console.log("Clicked Card ID:", carrdId);
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Close the menu here
        // For example:
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
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

  const handleEdit = () => {
    setIsMenuOpen(false);
    handleEditTask(carrdId);
    toggleModal();
  };

  const handleDelete = () => {
    handleTaskDelete(carrdId);
    closeDeleteModal();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH PRIORITY":
        return "#FF2473";
      case "MODERATE PRIORITY":
        return "#18B0FF";
      case "LOW PRIORITY":
        return "#63C05B";
      default:
        return "gray";
    }
  };

  const completedItemsCount = checklist.filter((item) => item.completed).length;

  const checklistItemslength = checklist.length;

  const handleShare = () => {
    if (carrdId) {
      const cardLink = `https://promanage-1-5mjl.onrender.com//tasks/${carrdId}
      `; // Construct the link with the dynamic ID
      navigator.clipboard
        .writeText(cardLink)
        .then(() => {
          toast.success("Link copied to clipboard"); // Show success toast
        })
        .catch((error) => {
          toast.error("Unable to copy link"); // Show error toast
          console.error("Unable to copy link: ", error);
        });
    } else {
      toast.error("Card ID is not available"); // Show error toast if ID is not available
    }
  };

  return (
    <div className={styles.card} ref={menuRef}>
      <ToastContainer />
      <div className={styles.header}>
        <div className={styles.priorityTag}>
          <div
            className={styles.priorityDot}
            style={{ backgroundColor: getPriorityColor(priority) }}
          ></div>
          <div className={styles.priorityText}>{priority}</div>
        </div>
        <div className={styles.menu}>
          <img src={menuIcon} alt="Menu" onClick={handleMenuClick}></img>
          {isMenuOpen && (
            <div className={styles.menuModal}>
              <div className={styles.menuOptions}>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={openDeleteModal}>Delete</button>
                <button onClick={handleShare}>Share</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <Accordion
          carrdId={carrdId}
          completedItemsCount={completedItemsCount}
          checklistItemslength={checklistItemslength}
        >
          <div className={styles.checklistItems}>
            <div className={styles.checklist}>
              {checklist.map((item, index) => (
                <ChecklistItem key={index} item={item} showIcon={false} />
              ))}
            </div>
          </div>
        </Accordion>
      </div>
      <div className={styles.footer}>
        {formattedDueDate === "Invalid date" ? (
          <div></div>
        ) : (
          <div className={styles.date}>{formattedDueDate}</div>
        )}
        <div className={styles.buttonsContainer}>
          {boardName !== "backlog" && ( // Conditionally render BACKLOG button
            <button
              onClick={() => handleMove("backlog")}
              className={styles.moveCardBtn}
            >
              BACKLOG
            </button>
          )}
          {boardName !== "todo" && ( // Conditionally render TO-DO button
            <button
              onClick={() => handleMove("todo")}
              className={styles.moveCardBtn}
            >
              TO-DO
            </button>
          )}
          {boardName !== "inProgress" && ( // Conditionally render PROGRESS button
            <button
              onClick={() => handleMove("inProgress")}
              className={styles.moveCardBtn}
            >
              PROGRESS
            </button>
          )}
          {boardName !== "done" && ( // Conditionally render DONE button
            <button
              onClick={() => handleMove("done")}
              className={styles.moveCardBtn}
            >
              DONE
            </button>
          )}
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ModernCard;
