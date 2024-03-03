import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import settingsIcon from "../../assets/settingsIcon.svg";
import codesandboxIcon from "../../assets/codesandboxIcon.svg";
import boardIcon from "../../assets/boardIcon.svg";
import databaseIcon from "../../assets/databaseIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import { useState } from "react";
import LogoutModal from "../LogoutModal/LogoutModal";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isLogoutModal, setIsLogoutModal] = useState(false);

  const openLogoutModal = () => {
    setIsLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={codesandboxIcon} alt="Logo" />
        <h1>Pro Manage</h1>
      </div>
      <nav className={styles.nav}>
        <div>
          <img src={boardIcon} alt="Home" />
          <Link to="/">Board</Link>
        </div>
        <div>
          <img src={databaseIcon} alt="Profile" />
          <Link to="/analytics">Analytics</Link>
        </div>
        <div>
          <img src={settingsIcon} alt="Login" />
          <Link to="/settings">Settings</Link>
        </div>
      </nav>
      <div onClick={openLogoutModal} className={styles.logout}>
        <img src={logoutIcon} alt="Logout" />
        <a href="#">Logout</a>
      </div>
      <LogoutModal
        isOpen={isLogoutModal}
        onClose={closeLogoutModal}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
