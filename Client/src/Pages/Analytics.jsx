import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import api from "../Api/api";
import Sidebar from "../Components/Sidebar/Sidebar";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    status: {
      todo: 0,
      inProgress: 0,
      backlog: 0,
      done: 0,
    },
    priority: {
      Low: 0,
      Moderate: 0,
      High: 0,
    },
    overdue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("analytics");
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.countItem}>
            <div>
              <span className={styles.dot}></span> <span>Todo:</span>
            </div>
            <h3>{counts.status.todo || 0}</h3>
          </div>
          <div className={styles.countItem}>
            <div>
              <span className={styles.dot}></span> <span>In Progress:</span>
            </div>
            <h3>{counts.status.inProgress || 0}</h3>
          </div>
          <div className={styles.countItem}>
            <div>
              <span className={styles.dot}></span> <span>Backlog:</span>
            </div>
            <h3>{counts.status.backlog || 0}</h3>
          </div>
          <div className={styles.countItem}>
            <div>
              <span className={styles.dot}></span> <span>Done:</span>
            </div>
            <h3>{counts.status.done || 0}</h3>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.countItem}>
            {" "}
            <div>
              <span className={styles.dot}></span> <span>Low Priority:</span>{" "}
            </div>
            <h3>{counts.priority["LOW PRIORITY"] || 0}</h3>
          </div>
          <div className={styles.countItem}>
            {" "}
            <div>
              <span className={styles.dot}></span>{" "}
              <span>Moderate Priority:</span>{" "}
            </div>
            <h3>{counts.priority["MODERATE PRIORITY"] || 0}</h3>
          </div>
          <div className={styles.countItem}>
            {" "}
            <div>
              <span className={styles.dot}></span> <span>High Priority:</span>{" "}
            </div>
            <h3>{counts.priority["HIGH PRIORITY"] || 0}</h3>
          </div>
          <div className={styles.countItem}>
            {" "}
            <div>
              <span className={styles.dot}></span> <span>Due Date Tasks:</span>{" "}
            </div>
            <h3>{counts.dueDate || 0}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
