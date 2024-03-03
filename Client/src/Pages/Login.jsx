import { useState } from "react";
import styles from "../Components/Form/Form.module.css";
import { useNavigate } from "react-router-dom";
import emailIcon from "../assets/emailIcon.svg";
import PasswordField from "../Components/PasswordField/PasswordField";
import InputField from "../Components/InputField/InputField";
import FormLayout from "../Components/FormLayout/FormLayout";
import { useAuth } from "../Contexts/auth";
import api from "../Api/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", {
        email: loginFormData.email,
        password: loginFormData.password,
      });
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Error during login:", response.data);
        // Show error message
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      // Show error message
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleLogin}>
      <FormLayout />
      <div className={styles.formRight}>
        <h1>Login</h1>
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={loginFormData.email}
          onChange={handleInputChange}
          icon={emailIcon}
        />
        <PasswordField
          name="password"
          placeholder="Password"
          value={loginFormData.password}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.authButton}>
          Login
        </button>
        <p>Have no account yet?</p>
        <button
          type="button"
          className={styles.authToggleButton}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
