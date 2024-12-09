import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/authContext";
import Navbar from "../components/Navbar";

const Home = () => {

  const { logout } = useContext(AuthContext);
  return (
    <>
    <div className="home-container">
     
      <h1 className="home-title">Welcome to Flashcard & User Management App</h1>
      <p className="home-description">
        Enhance your learning with flashcards and manage users effortlessly. 
        Log in or register to get started!
      </p>
      <div className="home-buttons">
        <Link to="/login">
          <button className="home-button">
            <span className="icon">🔑</span> Login
          </button>
        </Link>
        <Link to="/register">
          <button className="home-button">
            <span className="icon">📝</span> Register
          </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Home;
