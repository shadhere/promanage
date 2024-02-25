import { useState, useEffect } from "react";
import api from "../Api/api";
import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./Settings.module.css";
import userIcon from "../assets/userIcon.svg";
import InputField from "../Components/InputField/InputField";
import PasswordField from "../Components/PasswordField/PasswordField";

const Settings = () => {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/settings");
        const { name } = response.data;
        setUserData((prevData) => ({ ...prevData, name: name }));
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response) {
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await api.put("updatepassword", {
        name: userData.name,
        oldPassword: userData.oldPassword,
        newPassword: userData.newPassword,
      });
      setMessage("Password reset successful");
      console.log("Password reset successful");
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Error resetting password");
    }
  };

  return (
    <div className={styles.settingsPage}>
      <Sidebar />
      <form className={styles.formContainer} onSubmit={handleResetPassword}>
        <div className={styles.formRight}>
          <InputField
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleInputChange}
            icon={userIcon}
          />
          <PasswordField
            name="oldPassword"
            placeholder="Old Password"
            value={userData.oldPassword}
            onChange={handleInputChange}
          />
          <PasswordField
            name="newPassword"
            placeholder="New Password"
            value={userData.newPassword}
            onChange={handleInputChange}
          />
          <button type="submit" className={styles.authButton}>
            Update
          </button>{" "}
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Settings;
