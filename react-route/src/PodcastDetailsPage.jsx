

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { genres } from "./Data.js";
import "./PodcastDetailsPage.css";


export function getGenreNames(genreIds) {
  return genreIds.map((id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.title : "Unknown";
  });
}

export default function PodcastDetailsPage() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    async function fetchPodcast() {
      try {
        const res = await fetch("https://podcast-api.netlify.app/shows");
        const data = await res.json();
        const match = data.find((p) => p.id === id);
        if (match) {
          setPodcast(match);
        } else {
          setError("Podcast not found");
        }
      } catch (err) {
        setError("Failed to load podcast");
      }
    }
    fetchPodcast();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!podcast) return <p>Loading...</p>;

  const genreNames = getGenreNames(podcast.genres);

  return (
    <div className="podcast-detail">
      <img src={podcast.image} alt={podcast.title} className="podcast-image" />
      <div className="podcast-info">
        <h1 className="podcast-title">{podcast.title}</h1>
        <p className="podcast-description">{podcast.description}</p>
        <p className="podcast-updated">
          Last updated: {new Date(podcast.updated).toLocaleDateString()}
        </p>
        <p className="podcast-genres">
          Genres: {genreNames.join(", ") || "None"}
        </p>
        <p className="podcast-seasons">Seasons: {podcast.seasons}</p>

        
        {podcast.seasons > 1 && (
          <select
            className="season-dropdown"
            onChange={(e) => setSelectedSeason(e.target.value)}
            value={selectedSeason || ""}
          >
            <option value="" disabled>
              Select a season
            </option>
            {Array.from({ length: podcast.seasons }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Season {i + 1}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}


