import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();

  const {username, logout} = useContext(AuthContext);

  console.log(username, "user");
  

  const location = useLocation(); // Get the current location

  const isOnCreatePage = location.pathname === "/flashcards/create"; // Check if we're on the create page


  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>
          FlashcardZone
        </Link>
      </div>
      <h1 >Welcome, {username}</h1>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          
          <Link to={isOnCreatePage ? "/flashcards" : "/flashcards/create"} style={styles.navLink}>
            {isOnCreatePage ? "List" : "Create"} {/* Switch text */}
          </Link>
        </li>
        
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    margin: "5px 5px",
    padding: "15px 30px",
    background: "linear-gradient(90deg, #ffecd2, #fcb69f)", // Pastel gradient
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "2rem",
    fontWeight: "bold",
    fontFamily: "'Montserrat', sans-serif",
    color: "#ff6b6b",
  },
  logoLink: {
    textDecoration: "none",
    color: "#ff6b6b",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "15px",
  },
  navLink: {
    color: "#333",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontFamily: "'Poppins', sans-serif",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "background-color 0.3s, transform 0.3s",
  },
  navLinkHover: {
    backgroundColor: "#ffe6e6",
  },
  logoutButton: {
    backgroundColor: "#ffe6e6",
    color: "#ff6b6b",
    border: "none",
    borderRadius: "8px",
    padding: "8px 15px",
    fontSize: "1.1rem",
    fontFamily: "'Poppins', sans-serif",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  logoutButtonHover: {
    backgroundColor: "#ffc4c4",
  },
};

export default Navbar;
