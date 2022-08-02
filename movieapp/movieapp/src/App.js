import React from 'react';
import './App.css'

import Banner from "./components/Banner";
import Favorites from './components/Favorites';
import MovieList from './components/MoviesLIst';
import Navbar from "./components/Navbar";

import{BrowserRouter, Route, Routes} from 'react-router-dom'
function App() {
  return (
    
<BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <MovieList />
            </>
          }
        />

        <Route path="/favourites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//