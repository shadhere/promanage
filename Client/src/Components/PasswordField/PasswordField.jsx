import styles from "../PasswordField/PasswordField.module.css";
import showPasswordIcon from "../../assets/showPasswordIcon.svg";
import hidePasswordIcon from "../../assets/hidePasswordIcon.png";
import { useState } from "react";
import passwordIcon from "../../assets/passwordIcon.svg";

const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputContainer}>
      <img
        src={passwordIcon}
        alt="confirm password"
        className={styles.inputIcon}
      />
      <input
        type={showPassword ? "text" : "password"}
        {...props}
        className={styles.inputField}
      />
      <img
        src={showPassword ? showPasswordIcon : hidePasswordIcon}
        alt="toggle password visibility"
        className={styles.passwordIcon}
        onClick={handleTogglePassword}
      />
    </div>
  );
};

export default PasswordField;
