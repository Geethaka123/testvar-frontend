import React, { useState, useEffect } from 'react';
import '../styles/flashcardEditmodal.css';

const EditFlashcardModal = ({ selectedFlashcard, closeModal, updateFlashcard }) => {
  const [flashcardData, setFlashcardData] = useState(null);

  useEffect(() => {
    if (selectedFlashcard) {
      setFlashcardData({ ...selectedFlashcard });
    }
  }, [selectedFlashcard]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlashcardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle card updates
  const handleCardChange = (index, field, value) => {
    const updatedCards = [...flashcardData.cards];
    updatedCards[index][field] = value;
    setFlashcardData({ ...flashcardData, cards: updatedCards });
  };

  // Handle form submission
  const handleSave = () => {
    if (!flashcardData || !flashcardData.cards || flashcardData.cards.length === 0) {
      alert("Please ensure all flashcard data is filled out correctly.");
      return;
    }

    console.log("Saving flashcard:", flashcardData);
    
    
    updateFlashcard(flashcardData);  // Pass complete flashcard data including cards
    closeModal(); // Close modal after saving
  };

  if (!flashcardData) return null;

  return (
    <div className="modal">
      <h3>Edit Flashcard Set</h3>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={flashcardData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={flashcardData.description}
          onChange={handleChange}
        />
      </div>
      <div className="cards-section">
        <h4>Flashcards</h4>
        {flashcardData.cards.map((card, index) => (
          <div key={card._id} className="card">
            <div className="form-group">
              <label htmlFor={`question-${index}`}>Question</label>
              <input
                type="text"
                id={`question-${index}`}
                value={card.question}
                onChange={(e) =>
                  handleCardChange(index, 'question', e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor={`answer-${index}`}>Answer</label>
              <input
                type="text"
                id={`answer-${index}`}
                value={card.answer}
                onChange={(e) =>
                  handleCardChange(index, 'answer', e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={card.hidden}
                  onChange={(e) =>
                    handleCardChange(index, 'hidden', e.target.checked)
                  }
                />
                Hidden
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="modal-actions">
        <button className="save" onClick={handleSave}>
          Save
        </button>
        <button className="cancel" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditFlashcardModal;
