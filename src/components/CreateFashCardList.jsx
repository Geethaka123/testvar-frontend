import React, { useContext, useState } from "react";
import api from "../services/api";
import "../styles/flashcardForm.css";
import AuthContext from "../context/authContext";
import Navbar from "./Navbar";
const FlashcardForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([{ question: "", answer: "" }]);
  //   const [createdBy, setCreatedBy] = useState("6750a91bc87d9e9dd44f476f"); // Example user ID
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { userId, logout } = useContext(AuthContext);

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const handleAddCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };

  const handleRemoveCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        createdBy: userId,
        title,
        description,
        cards,
      };

      const response = await api.post("/flashcards", payload);
      setMessage("Flashcard set created successfully!");
      setTitle("");
      setDescription("");
      setCards([{ question: "", answer: "" }]);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while creating the flashcard set.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="flashcard-form-container">
        <h1>Create Flashcard Set</h1>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              className="input-field"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="input-field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Cards:</label>
            {cards.map((card, index) => (
              <div key={index} className="card">
                <div className="form-group">
                  <label>Question:</label>
                  <input
                    className="input-field"
                    type="text"
                    value={card.question}
                    onChange={(e) =>
                      handleCardChange(index, "question", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Answer:</label>
                  <input
                    className="input-field"
                    type="text"
                    value={card.answer}
                    onChange={(e) =>
                      handleCardChange(index, "answer", e.target.value)
                    }
                    required
                  />
                </div>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleRemoveCard(index)}
                >
                  Remove Card
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-button"
              onClick={handleAddCard}
            >
              Add Card
            </button>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Submitting..." : "Create Flashcard Set"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlashcardForm;
