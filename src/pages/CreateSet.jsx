import React, { useState } from 'react';
import api from '../services/api';

const CreateSet = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/flashcards', { name });
    alert('Flashcard set created!');
    setName('');
  };

  return (
    <div className="container mt-3">
      <h1>Create Flashcard Set</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Set Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreateSet;
