import React, { useState, useEffect, Fragment } from "react";
import { Router, Link } from "@reach/router";
import Movie from "./components/Movies.js";
import MovieInfo from "./components/MoviesInfo.js";


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const FEATURED_API =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4228f6f94463d3d0d334fb285213df67";

  const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?&api_key=4228f6f94463d3d0d334fb285213df67&query=";

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Fragment>
      <nav>
        <div>
          <Link to="/">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="logo" />
            </Link>
          <ul>
            <li>
              <a href="/"><b>Movies</b></a>
            </li>
            <li>
              <a href="/"> <b>TV Shows</b></a>
            </li>
            <li>
              <a href="/"><b>People</b></a>
            </li>
          </ul>
          <form onSubmit={handleOnSubmit}>
            <input
              className="search"
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleOnChange}
            />
            </form>
          </div>
      </nav>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
      <Router>
        <MovieInfo path="/movie/:id" />
      </Router>
    </Fragment>
  );
}

export default App;
