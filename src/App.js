
import React from 'react';

import './App.css';
import Row from './Row';
import Request from './Request';
import Banner from './Banner';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
     
      <Banner />
        <Row title="NETFLIX ORIGINALS" fetchURL={Request.fetchNetflixOriginals} isLargeRow/>
        <Row title="TRENDING NOW" fetchURL={Request.fetchTrending}/>
        <Row title="TTOP RATED" fetchURL={Request.fetchTopRated}/>
        <Row title="ACTION MOVIES" fetchURL={Request.fetchActionMovies}/>
        <Row title="COMEDY MOVIES" fetchURL={Request.fetchComedyMovies}/>
        <Row title="HORROR MOVIES" fetchURL={Request.fetchHorrorMovies}/>
        <Row title="ROMANCE MOVIES" fetchURL={Request.fetchRomanceMovies}/>
      <Footer />
    </div>
  );
}

export default App;
