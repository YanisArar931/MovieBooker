import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Reservations() {
  const [movieTitle, setMovieTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // ✅ Récupération du JWT
      if (!token) {
        alert("Vous devez être connecté pour réserver un film.");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/reservations",
        {
          movieTitle,
          startTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Envoi du JWT
        }
      );

      alert("Réservation réussie !");
      navigate("/"); // ✅ Redirige vers la liste des films
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de la réservation");
    }
  };

  return (
    <div className="page-container">
      <h2>🎟️ Faire une Réservation</h2>
      <div className="form-container">
        <form onSubmit={handleReservation}>
          <input
            type="text"
            placeholder="Titre du film"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            placeholder="Heure de début"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <button type="submit">Réserver</button>
        </form>
        <button className="back-button" onClick={() => navigate("/")}>⬅️ Retour à l'accueil</button>
      </div>
    </div>
  );
}

export default Reservations;