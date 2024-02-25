import { useState, useEffect } from "react";
import api from "../Api/api";
import Form from "../Components/Form";
import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./Settings.module.css";

const Settings = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/settings");
        const { name } = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error setting up the request:", error.message);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (authData) => {
    try {
      const data = {
        name: authData.name,
        oldPassword: authData.password,
        newPassword: authData.confirmPassword,
      };
      await api.post("/api/users/reset-password", data);
      setMessage("Password reset successful");
    } catch (error) {
      console.error(error);
      setMessage("Error resetting password");
    }
  };

  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.formRight}>
        <Form formType="resetPassword" onSubmit={handleSubmit} name={name} />{" "}
        {/* Pass initialName to Form */}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Settings;
