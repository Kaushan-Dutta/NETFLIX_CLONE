import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Row.css';
import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer';



const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {


  useEffect(getMovies, [fetchURL]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = { height: "100%", width: "100%", playerVars: { autoplay: 1, } };



const [movies, setMovies] = useState([]);

function getMovies() {
    const getRequest = async () => {
      const request = await axios.get(fetchURL).then((res) => {  setMovies(res.data.results); }).catch((err) => { console.log(err); });
    }
    getRequest();
}

function trailer(event) {
   
    if (trailerUrl) { setTrailerUrl(''); }
    else {
      movieTrailer(event?.name || event?.title)
        .then((url) => {
          
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
          
        }).catch((err) => { console.log(err) })
    }
   
}

  return (

    <div>
      <div className="row mt-2">

        <h3>{title}</h3>
        <div className='row_posters'>
          {movies.map((object) => {
            return (
              <>
                <img key={movies.id} onClick={() => { trailer(object) }} className={"row_poster " + (isLargeRow ? "row_posterLarge" : "")} src={baseURL + (isLargeRow ? object.poster_path : object.backdrop_path)} alt={object.name} />
              </>
            )
          })}
        </div>
        {trailerUrl ? <Youtube videoId={trailerUrl} opts={opts} /> : ""}
       
      </div>
    </div>
  )

}

export default Row;
