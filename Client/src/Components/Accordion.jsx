import styles from "./Accordion.module.css";
import upArrowIcon from "../assets/upArrowIcon.svg";
import downArrowIcon from "../assets/downArrowIcon.svg";
const Accordion = ({ title, expanded, onToggle, children }) => {
  return (
    <div className={`${styles.accordion} ${expanded ? styles.expanded : ""}`}>
      <div className={styles.accordionHeader} onClick={onToggle}>
        <h3>Checklist</h3>
        <div className={styles.accordionIcon}>
          {expanded ? (
            <img src={upArrowIcon} alt="" />
          ) : (
            <img src={downArrowIcon} alt="" />
          )}
        </div>
      </div>
      {expanded && <div>{children}</div>}
    </div>
  );
};

export default Accordion;
