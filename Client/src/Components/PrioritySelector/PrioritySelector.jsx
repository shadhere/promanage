import React from "react";
import styles from "./PrioritySelector.module.css";

const PrioritySelector = ({ priority, handlePriorityChange }) => {
  return (
    <div className={styles.priorityContainer}>
      <label>
        Select Priority
        <span style={{ color: "red", marginLeft: "5px" }}>*</span>
      </label>
      <div className={styles.priorityTags}>
        <div
          className={`${styles.priorityTag} ${
            priority === "HIGH PRIORITY" && styles.active
          }`}
          onClick={() => handlePriorityChange("HIGH PRIORITY")}
        >
          <div
            className={styles.priorityDot}
            style={{ backgroundColor: "red" }}
          ></div>
          HIGH PRIORITY
        </div>
        <div
          className={`${styles.priorityTag} ${
            priority === "MODERATE PRIORITY" && styles.active
          }`}
          onClick={() => handlePriorityChange("MODERATE PRIORITY")}
        >
          <div
            className={styles.priorityDot}
            style={{ backgroundColor: "yellow" }}
          ></div>
          MODERATE PRIORITY
        </div>
        <div
          className={`${styles.priorityTag} ${
            priority === "LOW PRIORITY" && styles.active
          }`}
          onClick={() => handlePriorityChange("LOW PRIORITY")}
        >
          <div
            className={styles.priorityDot}
            style={{ backgroundColor: "green" }}
          ></div>
          LOW PRIORITY
        </div>
      </div>
    </div>
  );
};

export default PrioritySelector;
