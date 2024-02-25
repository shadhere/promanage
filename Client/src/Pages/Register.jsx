import Form from "../Components/Form";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const onSubmit = async (userData) => {
    try {
      const response = await api.post("/register", userData);
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
    <div>
      <Form formType="register" onSubmit={onSubmit} />
    </div>
  );
};

export default RegisterPage;
