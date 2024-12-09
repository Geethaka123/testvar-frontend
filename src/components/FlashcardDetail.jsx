import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api"; // Adjust the path as needed

const FlashcardDetail = () => {
  const [flashcard, setFlashcard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams(); // Get flashcard ID from URL

  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track current card index
  const [fadeIn, setFadeIn] = useState(true); // State for animation

  useEffect(() => {
    const fetchFlashcardDetails = async () => {
      try {
        const response = await api.get(`/flashcards/${id}`); // Fetch flashcard by ID
        setFlashcard(response.data);
      } catch (err) {
        setError("Failed to fetch flashcard details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardDetails();
  }, [id]);

  const handleNextCard = () => {
    if (flashcard && currentCardIndex < flashcard.cards.length - 1) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
        setFadeIn(true);
      }, 300);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex - 1);
        setFadeIn(true);
      }, 300);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return <p>Loading flashcard details...</p>;
  }

  if (error) {
    return <p style={{ color: "#e74c3c" }}>{error}</p>; // Red color for error message
  }

  if (!flashcard) {
    return <p>Flashcard not found.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{flashcard.title}</h1>
      <p style={styles.description}>{flashcard.description}</p>
      <h3 style={styles.cardsHeading}>Cards: {flashcard.cards.length}</h3>

      {/* Navigation Buttons */}
      <div style={styles.navigationButtons}>
        <button onClick={handlePrevCard} style={styles.navButton}>
          &lt; Prev
        </button>
        <button onClick={handleNextCard} style={styles.navButton}>
          Next &gt;
        </button>
      </div>

      {/* Displaying Current Card */}
      <div
        style={{
          ...styles.cardWrapper,
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Flashcard card={flashcard.cards[currentCardIndex]} />
      </div>
      <button onClick={handleGoBack} style={styles.navButton}>
        Go back to cards list
      </button>
    </div>
  );
};

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false); // State to handle card flip

  const toggleFlip = () => {
    setIsFlipped((prevState) => !prevState);
  };

  return (
    <div
      style={styles.cardWrapper}
      onClick={toggleFlip} // Flip card on click
    >
      <div
        style={{
          ...styles.cardInner,
          transform: isFlipped ? "rotateY(180deg)" : "none",
        }}
      >
        <div style={styles.cardFront}>
          <h4 style={styles.cardTitle}>Question:</h4>
          <p style={styles.cardContent}>{card.question}</p>
        </div>
        <div style={styles.cardBack}>
          <h4 style={styles.cardTitle}>Answer:</h4>
          <p style={styles.cardContent}>{card.answer}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f0f4f8",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.8rem",
    marginBottom: "15px",
    color: "#2980b9",
  },
  description: {
    fontSize: "1.3rem",
    color: "#34495e",
    marginBottom: "40px",
    lineHeight: "1.6",
  },
  cardsHeading: {
    fontSize: "1.6rem",
    marginBottom: "25px",
    color: "#16a085",
  },
  cardWrapper: {
    marginTop: "40px",
    width: "100%",
    height: "300px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "40px",
  },
  cardInner: {
    width: "90%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardFront: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    padding: "20px",
    background: "linear-gradient(to bottom right, #a1c4fd, #c2e9fb)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cardBack: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    padding: "20px",
    backgroundColor: "#f1c7e4",
    borderRadius: "12px",
    transform: "rotateY(180deg)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#2980b9",
  },
  cardContent: {
    fontSize: "1.1rem",
    color: "#7f8c8d",
    lineHeight: "1.5",
    wordWrap: "break-word",
  },
  navigationButtons: {
    marginBottom: "30px",
  },
  navButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#2980b9",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "0 10px",
    transition: "background-color 0.3s",
  },
};

export default FlashcardDetail;
