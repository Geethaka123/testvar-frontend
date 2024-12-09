import React, { useState, useEffect } from "react";
import api from "../services/api"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const FlashcardsList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await api.get("/flashcards"); // Endpoint to get all flashcards
        setFlashcards(response.data);
      } catch (err) {
        setError("Failed to fetch flashcards.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const handleCardClick = (flashcardId) => {
    // Navigate to the detail page of the clicked flashcard
    navigate(`/flashcard/${flashcardId}`);
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>Flashcards List</h1>
        {loading && <p style={styles.loadingText}>Loading...</p>}
        {error && <p style={styles.errorText}>{error}</p>}

        {!loading && !error && flashcards.length === 0 && (
          <p style={styles.noFlashcards}>No flashcards available.</p>
        )}

        {flashcards.length > 0 && (
          <div style={styles.gridContainer}>
            {flashcards.map((flashcard) => (
              <div
                key={flashcard._id}
                style={styles.flashcardContainer}
                onClick={() => handleCardClick(flashcard._id)} // Click event to view details
              >
                <h3 style={styles.flashcardTitle}>title:{flashcard.title}</h3>
                <p style={styles.flashcardDescription}>
                  description:{flashcard.description}
                </p>
                <p style={styles.flashcardDescription}>
                  createdBy: {flashcard.username}{" "}
                  <span
                    style={
                      flashcard.role === "user"
                        ? styles.userRole
                        : styles.adminRole
                    }
                  >
                    ({flashcard.role === "user" ? "You" : flashcard.role})
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    fontSize: "2rem",
    marginBottom: "40px",
  },
  loadingText: {
    textAlign: "center",
    color: "#888",
  },
  errorText: {
    textAlign: "center",
    color: "red",
  },
  noFlashcards: {
    textAlign: "center",
    color: "#888",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  flashcardContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  flashcardTitle: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "10px",
  },
  flashcardDescription: {
    color: "#666",
    fontSize: "1rem",
    lineHeight: "1.4",
  },
  userRole: {
    color: "#3498db", // Light blue color for 'user'
    fontWeight: "bold",
  },
  adminRole: {
    color: "#e74c3c", // Red color for 'admin'
    fontWeight: "bold",
  },
};

export default FlashcardsList;
