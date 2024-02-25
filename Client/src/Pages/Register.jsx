import { useState } from "react";
import styles from "../Components/Form.module.css";
import { useNavigate } from "react-router-dom";
import emailIcon from "../assets/emailIcon.svg";
import PasswordField from "../Components/PasswordField/PasswordField";
import InputField from "../Components/InputField/InputField";
import FormLayout from "../Components/FormLayout/FormLayout";
import { useAuth } from "../Contexts/auth";
import api from "../Api/api";
import userIcon from "../assets/userIcon.svg";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/register", registerFormData);
      if (response.data) {
        console.log("Registration successful:", response.data);
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Error during registration:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Response error during registration:",
          error.response.data
        );
      } else if (error.request) {
        console.error("Network error during registration:", error.request);
      } else {
        console.error("Error during registration:", error.message);
        // show error message
      }
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleRegister}>
      <FormLayout />
      <div className={styles.formRight}>
        <h1>Register</h1>
        <InputField
          type="text"
          name="name"
          placeholder="Name"
          value={registerFormData.name}
          onChange={handleInputChange}
          icon={userIcon}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={registerFormData.email}
          onChange={handleInputChange}
          icon={emailIcon}
        />
        <PasswordField
          name="password"
          placeholder="Password"
          value={registerFormData.password}
          onChange={handleInputChange}
        />
        <PasswordField
          name="confirmPassword"
          placeholder="Confirm Password"
          value={registerFormData.confirmPassword}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.authButton}>
          Register
        </button>
        <p>Have no account yet?</p>
        <button
          type="button"
          className={styles.authToggleButton}
          onClick={() => navigate("/login")}
        >
          Login
        </button>{" "}
      </div>
    </form>
  );
};

export default RegisterPage;
