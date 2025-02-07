import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = query
          ? `http://localhost:3000/movies/search/movie?query=${query}&page=${page}`
          : `http://localhost:3000/movies?page=${page}`;

        const res = await axios.get(url);
        setMovies(res.data.results);
      } catch (error) {
        console.error("Erreur lors du chargement des films", error);
      }
    };

    fetchMovies();
  }, [page, query]);

  return (
    <div>
      <Navbar onSearch={setQuery} setPage={setPage} />
      <h2 style={{ textAlign: "center" }}>🎬 Films Populaires</h2>
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>⬅️ Précédent</button>
        <button onClick={() => setPage((prev) => prev + 1)}>Suivant ➡️</button>
      </div>
    </div>
  );
}

export default Movies;