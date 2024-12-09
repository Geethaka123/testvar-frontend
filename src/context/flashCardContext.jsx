import React, { createContext, useState } from 'react';

export const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <FlashcardContext.Provider value={{ flashcards, setFlashcards, loading, setLoading }}>
      {children}
    </FlashcardContext.Provider>
  );
};
