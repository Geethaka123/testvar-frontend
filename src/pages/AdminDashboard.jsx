import React, { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import EditFlashcardModal from "../components/FlashcardEditModal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [editUserDetails, setEditUserDetails] = useState({
    username: "",
    email: "",
    role: "",
    dailyLimit: "",
  });
  const [editFlashcardDetails, setEditFlashcardDetails] = useState();
  const [globalDailyLimit, setGlobalDailyLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Users and Flashcards
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userResponse, flashcardResponse] = await Promise.all([
          api.get("/users"),
          api.get("/flashcards/all"),
        ]);
        setUsers(userResponse.data.users);
        setFlashcards(flashcardResponse.data);
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateGlobalDailyLimit = async () => {
    if (!globalDailyLimit) return alert("Please enter a global daily limit.");
    try {
      await api.put("/users/daily-limit", { dailyLimit: globalDailyLimit });
      alert("Global daily limit updated successfully.");
      setGlobalDailyLimit("");
      const response = await api.get("/users");
      setUsers(response.data.users);
    } catch (err) {
      alert("Failed to update global daily limit.");
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${userId}`);
      alert("User deleted successfully.");
      const response = await api.get("/users");
      setUsers(response.data.users);
    } catch (err) {
      alert("Failed to delete user.");
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditUserDetails({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  const saveEdit = async () => {
    if (!editUserDetails.username || !editUserDetails.email) {
      return alert("Username and email are required.");
    }
    try {
      await api.put(`/users/${selectedUser._id}`, editUserDetails);
      alert("User updated successfully.");
      setSelectedUser(null);
      setEditUserDetails({ username: "", email: "", role: "" });
      const response = await api.get("/users");
      setUsers(response.data.users);
    } catch (err) {
      alert("Failed to update user.");
      console.error(err);
    }
  };

  // Flashcard Functions
  const handleEditFlashcard = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setEditFlashcardDetails(flashcard);
  };

  const saveEditFlashcard = async () => {
    try {
      await api.put(
        `/flashcards/${selectedFlashcard._id}`,
        editFlashcardDetails
      );
      alert("Flashcard updated successfully.");
      setSelectedFlashcard(null);
      const response = await api.get("/flashcards/all");
      setFlashcards(response.data);
    } catch (err) {
      alert("Failed to update flashcard.");
      console.error(err);
    }
  };

  const deleteFlashcard = async (flashcardId) => {
    if (!window.confirm("Are you sure you want to delete this flashcard?"))
      return;
    try {
      await api.delete(`/flashcards/${flashcardId}`);
      alert("Flashcard deleted successfully.");
      const response = await api.get("/flashcards/all");
      setFlashcards(response.data);
    } catch (err) {
      alert("Failed to delete flashcard.");
      console.error(err);
    }
  };

  const closeModal = () => {
    setSelectedFlashcard(null);
  };

  const updateFlashcard = (updatedFlashcard) => {

    console.log("Updating flashcard:", updatedFlashcard);
    
    setFlashcards(flashcards.map(fc => fc._id === updatedFlashcard._id ? updatedFlashcard : fc));
    saveEditFlashcard();
  };

  return (
    <div style={styles.dashboard}>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={styles.errorText}>{error}</p>}

        <div style={styles.statsContainer}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Total Users</h3>
            <p style={styles.cardValue}>{users.length}</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Global Daily Limit</h3>
            <input
              type="number"
              value={globalDailyLimit}
              onChange={(e) => setGlobalDailyLimit(e.target.value)}
              placeholder="Enter limit"
              style={styles.input}
            />
            <button onClick={updateGlobalDailyLimit} style={styles.button}>
              Update Limit
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Manage Users</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Daily Limit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={styles.tableRow}>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.dailyLimit}</td>
                    <td>
                      <button
                        style={styles.editButton}
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteButton}
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Flashcard Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Manage Flashcards</h2>
          {/* Flashcard Table */}
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th>Flashcard ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {flashcards.map((flashcard) => (
                  <tr key={flashcard._id} style={styles.tableRow}>
                    <td>{flashcard._id}</td>
                    <td>{flashcard.title}</td>
                    <td>{flashcard.description}</td>
                    <td>
                      <button
                        style={styles.editButton}
                        onClick={() => handleEditFlashcard(flashcard)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteButton}
                        onClick={() => deleteFlashcard(flashcard._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUser && (
          <div style={styles.editModal}>
            <h3>Edit User Details</h3>
            <input
              type="text"
              value={editUserDetails.username}
              onChange={(e) =>
                setEditUserDetails({
                  ...editUserDetails,
                  username: e.target.value,
                })
              }
              placeholder="Username"
              style={styles.input}
            />
            <input
              type="email"
              value={editUserDetails.email}
              onChange={(e) =>
                setEditUserDetails({
                  ...editUserDetails,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              style={styles.input}
            />
            <select
              value={editUserDetails.role}
              onChange={(e) =>
                setEditUserDetails({ ...editUserDetails, role: e.target.value })
              }
              style={styles.input}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {/* <input
              type="number"
              value={editUserDetails.dailyLimit}
              onChange={(e) =>
                setEditUserDetails({ ...editUserDetails, dailyLimit: e.target.value })
              }
              placeholder="Daily Limit"
              style={styles.input}
            /> */}
            <button onClick={saveEdit} style={styles.button}>
              Save Changes
            </button>
            <button
              onClick={() => setSelectedUser(null)}
              style={{ ...styles.button, backgroundColor: "grey" }}
            >
              Cancel
            </button>
          </div>
        )}
        {selectedFlashcard && (
        <EditFlashcardModal
          selectedFlashcard={selectedFlashcard}
          closeModal={closeModal}
          updateFlashcard={updateFlashcard}
        />
      )}
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f6fa",
    minHeight: "100vh",
    color: "#333",
  },
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    margin: "20px 0",
    fontSize: "24px",
    color: "#2f3640",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    flex: 1,
    background: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "18px",
    color: "#57606f",
  },
  cardValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2ed573",
  },
  section: {
    marginTop: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    marginBottom: "10px",
    fontSize: "20px",
    color: "#333",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#3742fa",
    color: "#ffffff",
  },
  tableRow: {
    backgroundColor: "#f1f2f6",
    textAlign: "center",
  },
  input: {
    padding: "8px",
    marginTop: "10px",
    // marginRight: "500px",
    width: "90%",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#1e90ff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  editButton: {
    padding: "6px 10px",
    backgroundColor: "#2ed573",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    padding: "6px 10px",
    backgroundColor: "#ff4757",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  errorText: {
    color: "#e84118",
    textAlign: "center",
  },
  editModal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  },
};

export default AdminDashboard;
