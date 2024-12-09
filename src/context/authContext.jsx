import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        console.log(decodedToken, "decoded token");
        setRole(decodedToken.role); // Set the role based on the decoded token
        setUserId(decodedToken.userId);
        setUsername(decodedToken.username);
        console.log(role);
      } catch (error) {
        console.error("Failed to decode token", error);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [token, role]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    console.log("Logging out...");
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    setToken(null);
    setRole(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, role, userId, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
