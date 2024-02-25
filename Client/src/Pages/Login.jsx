import Form from "../Components/Form";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const onSubmit = async (userData) => {
    try {
      const response = await api.post("/login", {
        email: userData.email,
        password: userData.password,
      });
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        // Set authentication state to true
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
    <div>
      <Form formType="login" onSubmit={onSubmit} />
    </div>
  );
};

export default LoginPage;
