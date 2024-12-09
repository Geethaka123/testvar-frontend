import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css"; // Reusing the styles from the login component

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    // Validation checks
    if (!username || !email || !password) {
      setMessage("All fields are required.");
      return;
    }

    if (username.length < 3) {
      setMessage("Username must be at least 3 characters long.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // if (password.length < 6) {
    //   setMessage("Password must be at least 6 characters long.");
    //   return;
    // }

    try {
      setLoading(true);
      setMessage("");
      const response = await api.post("/users/register", formData);
      setMessage("Registration successful! Please log in.");
      setTimeout(() => {
        navigate("/login"); // Redirect to login after 2 seconds
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-heading">Create Your Account</h2>
        <p className="login-subheading">Join us and start your journey!</p>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="login-input"
          value={formData.username}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="login-input"
          value={formData.email}
          type="email"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="login-input"
          value={formData.password}
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        {message && <p className="login-message">{message}</p>}
        <p className="login-alt-option">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
