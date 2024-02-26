import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import LoginPage from "./Pages/Login.jsx";
import RegisterPage from "./Pages/Register.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import { AuthProvider } from "./Contexts/auth.jsx";
import Settings from "./Pages/Settings.jsx";
import Analytics from "./Pages/Analytics.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Analytics" element={<Analytics />} />
            <Route exact path="/Settings" element={<Settings />} />
          </Route>{" "}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
