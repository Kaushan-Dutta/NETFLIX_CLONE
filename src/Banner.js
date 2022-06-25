import React, { useState, useEffect } from "react";
import axios from "axios";
import Request from "./Request";
import "./Banner.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Banner() {
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios
        .get(Request.fetchNetflixOriginals)
        .then((res) => {
          setMovie(
            res.data.results[
              Math.floor(Math.random() * res.data.results.length - 1)
            ]
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const opts = { height: "390", width: "100%", playerVars: { autoplay: 1 } };

  function trailer(event) {
    

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(event?.name || event?.title)
        .then((url) => {
          
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
         
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  }

  function truncated(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div>
      <header
        className="banner mb-4"
        style={{
          backgroundSize: "cover",

          backgroundImage: `url(${
            "https://image.tmdb.org/t/p/original/" + movie.backdrop_path
          })`,
          backgroundPosition: "center",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            <button
              className="banner_button"
              onClick={() => {
                trailer(movie);
              }}
            >
              Play
            </button>
            <button className="banner_button">My List</button>
          </div>
          <h1 className="banner_description">
            {truncated(movie?.overview, 150)}
          </h1>
        </div>
        {trailerUrl ? (
          <Youtube
            videoId={trailerUrl}
            style={{
              height: "400",
              width: "100%",
              playerVars: { autoplay: 1 },
            }}
          />
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default Banner;
