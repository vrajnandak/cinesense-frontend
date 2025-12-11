import { useState } from "react";

export default function HomePage() {
  const [mode, setMode] = useState<
    "watched" | "friends" | "trends"
  >("watched");

  // Placeholder movie data for now
  const placeholderMovies = [
    { id: 1, title: "Movie 1" },
    { id: 2, title: "Movie 2" },
    { id: 3, title: "Movie 3" },
    { id: 4, title: "Movie 4" },
    { id: 5, title: "Movie 5" },
  ];

  const modeLabel = {
    watched: "Recommendations Based on Watched Movies",
    friends: "Recommendations Based on Friends",
    trends: "Recommendations Based on Global Trends",
  }[mode];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        padding: "30px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      {/* Top Section (Dropdown aligned right) */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <select
          value={mode}
          onChange={(e) =>
            setMode(e.target.value as "watched" | "friends" | "trends")
          }
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="watched">
            Watch recommendations based on previous watched movies
          </option>
          <option value="friends">
            Watch recommendations based on friends
          </option>
          <option value="trends">
            Watch recommendations based on global trends
          </option>
        </select>
      </div>

      {/* Section Title */}
      <h2
        style={{
          marginTop: "10px",
          fontWeight: "bold",
          fontSize: "22px",
          textAlign: "left",
        }}
      >
        {modeLabel}
      </h2>

      {/* Placeholder movie grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {placeholderMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              width: "100%",
              height: "250px",
              borderRadius: "12px",
              background: "#eaeaea",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "18px",
              color: "#555",
            }}
          >
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
}

