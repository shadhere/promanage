import styles from "./Kanban.module.css";
import collapseAllIcon from "../assets/collapseAllIcon.svg";
import ModernCard from "./ModernCard"; // Import the ModernCard component
import addTaskIcon from "../assets/addTaskIcon.svg"; // Import the addTaskIcon
const KanbanColumn = ({
  title,
  tasks,
  onMove,
  handleCollapseAllForBoard,
  boardName,
  toggleModal,
}) => {
  return (
    <div className={styles.column}>
      <h2 className={styles.columnTitle}>
        {title}
        <div className={styles.iconsContainer}>
          {boardName === "todo" && ( // Conditionally render addTaskIcon
            <img
              src={addTaskIcon}
              alt="Add Task"
              className={styles.addIcon}
              onClick={toggleModal}
            />
          )}
          <img
            src={collapseAllIcon}
            className={styles.icon}
            onClick={() => handleCollapseAllForBoard(boardName)}
          />
        </div>
      </h2>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <ModernCard
            key={task._id}
            carrdId={task._id}
            title={task.title}
            dueDate={task.dueDate}
            priority={task.priority}
            description={task.description}
            checklist={task.checklist}
            onMove={onMove}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
