import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setMessage("Both email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const response = await api.post("/users/login", formData);
      const { token } = response.data;

      console.log("Login response:", response);
      

      login(token);

      if (rememberMe) {
        localStorage.setItem("authToken", token);
      }

      if (response.data.role === "admin") {
        navigate("/admin-dashboard");
        // navigate("/flashcards");
      } else if (response.data.role === "user") {
        navigate("/flashcards");
      } else {
        setMessage("Unknown role. Please contact support.");
      }
    } catch (error) {
      setMessage(
        error.response?.data.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
    
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-heading">Welcome Back</h2>
        <p className="login-subheading">Login to access your account</p>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="login-input"
          value={formData.email}
          type="text"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="login-input"
          value={formData.password}
        />
        <div className="remember-me">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Remember Me
          </label>
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {message && <p className="login-message">{message}</p>}
        <p className="login-alt-option">
          Don't have an account?{" "}
          <Link to="/register" className="login-link">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
