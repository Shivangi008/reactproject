import React from 'react';
import './App.css'

import Banner from "./components/Banner";
import MovieList from './components/MoviesLIst';
import Navbar from "./components/Navbar";
function App() {
  return (
    
   <>
     <Navbar/>
     <Banner/>
     <MovieList/>
   </>
  );
}

export default App;
