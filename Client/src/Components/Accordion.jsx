import styles from "./Accordion.module.css";

const Accordion = ({ title, expanded, onToggle, children }) => {
  return (
    <div className={`${styles.accordion} ${expanded ? styles.expanded : ""}`}>
      <div className={styles.accordionHeader} onClick={onToggle}>
        <h3>{title}</h3>
        <div className={styles.icon}>
          <i className={`fas fa-chevron-${expanded ? "up" : "down"}`}></i>
        </div>
      </div>
      {expanded && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Accordion;
