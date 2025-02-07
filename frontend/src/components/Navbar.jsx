import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ onSearch, setPage }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleHomeClick = () => {
    setPage(1); // ✅ Revient à la page 1
    onSearch(""); // ✅ Supprime la recherche si active
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" onClick={handleHomeClick}>Accueil</Link>
        <Link to="/reservations">Reservations</Link>
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
      <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
    </nav>
  );
}

export default Navbar;