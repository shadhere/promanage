import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Analytics.module.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import api from "../Api/api";

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/analytics");
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="container">
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className="value">
              Backlog Tasks: {analyticsData.backlogTasks}
            </div>
            <div className="value">To-do Tasks: {analyticsData.todoTasks}</div>
            <div className="value">
              In-Progress Tasks: {analyticsData.inProgressTasks}
            </div>
            <div className="value">
              Completed Tasks: {analyticsData.completedTasks}
            </div>
          </div>
          <div className={styles.card}>
            <div className="value">
              Low Priority Tasks: {analyticsData.lowPriorityTasks}
            </div>
            <div className="value">
              Moderate Priority Tasks: {analyticsData.moderatePriorityTasks}
            </div>
            <div className="value">
              High Priority Tasks: {analyticsData.highPriorityTasks}
            </div>
            <div className="value">
              Due Date Tasks: {analyticsData.dueDateTasks}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
