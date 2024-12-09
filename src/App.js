import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Register from "./components/RegisterForm";
import Login from "./components/LoginForm";
import FlashcardList from "./components/FashCardList";
import Home from "./pages/Home";
import "./App.css";
import FlashcardForm from "./components/CreateFashCardList";
import FlashcardDetail from "./components/FlashcardDetail";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/flashcards" element={<FlashcardList />} />
          <Route path="/flashcard/:id" element={<FlashcardDetail />} />
          <Route path="/flashcards/create" element={<FlashcardForm />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
