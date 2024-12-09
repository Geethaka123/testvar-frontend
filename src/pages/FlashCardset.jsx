import React from 'react';
import { useParams } from 'react-router-dom';

const FlashcardSet = () => {
  const { id } = useParams();

  return (
    <div className="container mt-3">
      <h1>Flashcard Set ID: {id}</h1>
      {/* Add flashcard details here */}
    </div>
  );
};

export default FlashcardSet;
