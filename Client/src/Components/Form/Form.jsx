import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import authArt from "../../assets/Art.png";
import emailIcon from "../../assets/emailIcon.svg";
import userIcon from "../../assets/userIcon.svg";
import passwordIcon from "../../assets/passwordIcon.svg";
import authArtBackground from "../../assets/authArtBackground.png";
import showPasswordIcon from "../../assets/showPasswordIcon.svg";
import hidePasswordIcon from "../../assets/hidePasswordIcon.png";

const Form = ({ formType, onSubmit, name }) => {
  const [authData, setAuthData] = useState({
    email: "",
    name: "" || name,
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(authData);
  };

  const handleToggle = () => {
    const targetForm = formType === "register" ? "/login" : "/register";
    navigate(targetForm);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {(formType === "register" || formType === "login") && (
        <div className={styles.formLeft}>
          <div className={styles.imageContainer}>
            <img src={authArt} alt="authArt" className={styles.authArt} />
            <img
              src={authArtBackground}
              alt="authArtBackground"
              className={styles.authArtBackground}
            />
          </div>
          <h1>Welcome aboard my friend</h1>
          <p>Just a couple of clicks and we start</p>
        </div>
      )}

      <div className={styles.formRight}>
        {formType !== "resetPassword" && (
          <h1>{formType === "register" ? "Register" : "Login"}</h1>
        )}

        {(formType === "register" || formType === "resetPassword") && (
          <div className={styles.inputContainer}>
            <img src={userIcon} alt="username" className={styles.inputIcon} />
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              placeholder="Name"
              className={styles.inputField}
              value={name}
            />
          </div>
        )}

        {(formType === "login" || formType === "register") && (
          <div className={styles.inputContainer}>
            <img src={emailIcon} alt="email" className={styles.inputIcon} />
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Email"
              className={styles.inputField}
            />
          </div>
        )}

        {(formType === "resetPassword" ||
          formType === "register" ||
          formType === "login") && (
          <div className={styles.inputContainer}>
            <img
              src={passwordIcon}
              alt="password"
              className={styles.inputIcon}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleInputChange}
              placeholder={
                formType === "resetPassword" ? "Old Password" : "Password"
              }
              className={styles.inputField}
            />
            <img
              src={showPassword ? showPasswordIcon : hidePasswordIcon}
              alt="toggle password visibility"
              className={styles.passwordIcon}
              onClick={handleTogglePassword}
            />
          </div>
        )}

        {(formType === "register" || formType === "resetPassword") && (
          <div className={styles.inputContainer}>
            <img
              src={passwordIcon}
              alt="confirm password"
              className={styles.inputIcon}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleInputChange}
              placeholder={
                formType === "resetPassword"
                  ? "New Password"
                  : "Confirm Password"
              }
              className={styles.inputField}
            />
            <img
              src={showPassword ? showPasswordIcon : hidePasswordIcon}
              alt="toggle password visibility"
              className={styles.passwordIcon}
              onClick={handleTogglePassword}
            />
          </div>
        )}

        <button type="submit" className={styles.authButton}>
          {formType === "register"
            ? "Register"
            : formType === "login"
            ? "Login"
            : "Update"}
        </button>

        {(formType === "login" || formType === "register") && (
          <>
            <p>Have no account yet?</p>
            <button
              type="button"
              className={styles.authToggleButton}
              onClick={handleToggle}
            >
              {formType === "register" ? "Log in" : "Register"}
            </button>
          </>
        )}
      </div>
    </form>
  );
};

Form.propTypes = {
  formType: PropTypes.oneOf(["register", "login", "resetPassword"]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default Form;
