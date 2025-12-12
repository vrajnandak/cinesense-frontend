import React, { useEffect, useState } from "react";

// Replace with your OMDb API key
const API_KEY = "faa1f45c";

// Add 100 movie titles here
const MOVIE_TITLES = [
  "Avatar",
  "Inception",
  "The Dark Knight",
  "Interstellar",
  "Titanic",
  "Avengers: Endgame",
  "The Matrix",
  "Gladiator",
  "Joker",
  "The Godfather",
  // Add remaining 90 titles...
];

interface Movie {
  Title: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  Genre: string;
  Released: string;
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch all movies at once (parallel)
        const responses = await Promise.all(
          MOVIE_TITLES.map((title) =>
            fetch(
              `https://www.omdbapi.com/?t=${encodeURIComponent(
                title
              )}&apikey=${API_KEY}`
            ).then((res) => res.json())
          )
        );

	console.log("Response: ", responses);

        // Filter out movies not found
        const validMovies = responses.filter(
          (movie) => movie && movie.Response !== "False"
        );

        setMovies(validMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading movies...</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Movie List</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>{movie.Title}</h2>
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p><strong>IMDb:</strong> {movie.imdbRating}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
            <p>{movie.Plot}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
