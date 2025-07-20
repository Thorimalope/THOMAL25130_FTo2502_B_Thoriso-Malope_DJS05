import React, { useState, useEffect } from "react"; 
import Header from "./Header.jsx"
import PodcastCard from "./PodcastCards.jsx"
import { genres } from "./Data.js"
import SearchBar from "./searchBar.jsx";
import GenreFilter from "./genreFilter.jsx";
import SortDropdown from "./sorter.jsx";
import { Routes, Route } from "react-router-dom";
import PodcastDetailsPage from "./PodcastDetailsPage";
import "./index.css"
/*import "./PodcastDetailsPage.css";*/


export default function App() {

  const [podcasts, setPodcasts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOrder, setSortOrder] = useState("A-Z");


    useEffect(function () {
        fetch("https://podcast-api.netlify.app/")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("failed to load data")
                }
                return response.json();
            })
            .then(function (data) {
                setPodcasts(data);
            })
            .catch(function (error) {
                console.log("Error fetching data:", error);
                setErrorMessage(true)
            })
    }, []);


    function getGenresByIds(ids) {
    let result = [];

        for (let i = 0; i < ids.length; i++) {
            let match = genres.find(function (genre) {
            return genre.id === ids[i];
            });

            if (match) {
            result.push(match.title);
            }
        }

        return result;
    }
  
  
    const filteredPodcasts = podcasts.filter(function (podcast) {
      const titleMatch = podcast.title.toLowerCase().includes(search.toLowerCase());
      const genreList = getGenresByIds(podcast.genres);
      const genreMatch = selectedGenre === "All" || genreList.includes(selectedGenre);

      return titleMatch && genreMatch;
    });

    const sortedPodcasts = [...filteredPodcasts].sort(function (a, b) {
      if (sortOrder === "A-Z") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    const podcastCards = sortedPodcasts.map(function (podcast) {
        return (
            <PodcastCard
                key={podcast.id}
                id={podcast.id}
                image={podcast.image}
                title={podcast.title}
                seasons={podcast.seasons}
                updated={podcast.updated}
                genres={getGenresByIds(podcast.genres)} 
            />
        )
    })


return (
  <Routes>
    <Route
      path="/"
      element={
        errorMessage ? (
          <p>Error could not fetch data</p>
        ) : (
          <div>
            <Header />
            <div className="controls">
              <SearchBar value={search} onChange={setSearch} />
              <GenreFilter value={selectedGenre} onChange={setSelectedGenre} />
              <SortDropdown value={sortOrder} onChange={setSortOrder} />
            </div>
            <main id="podcast-grid" className="grid">
              {podcastCards}
            </main>
          </div>
        )
      }
    />
    <Route
      path="/podcast/:id"
      element={<PodcastDetailsPage podcasts={podcasts} getGenresByIds={getGenresByIds} />}
    />
  </Routes>
);
}

