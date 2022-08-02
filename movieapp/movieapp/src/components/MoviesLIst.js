import React, { Component } from "react";

// import { movies } from "./movieData";

import axios from 'axios'

   class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      hover: "",
      movies: [],
      currPage: 1,
      parr: [1],
      favorites:[]

    };
  }

  // we created another method to update the state
  async componentDidMount() {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f256c6f343e7be6220c90cdb69c0b020&language=en-US&page=${this.state.currPage}`)
    const movieDataApi = res.data.results

    this.setState({
      movies : [...movieDataApi]
    });
    console.log('Mounting third');

  }

  

  changePage = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=f256c6f343e7be6220c90cdb69c0b020&language=en-US&page=${this.state.currPage}`
    );
    const movieDataApi = res.data.results;

    this.setState({
      movies: [...movieDataApi],
    });
  };

  handleNext = () => {
    let tempArr = [];

    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      tempArr.push(i);
    }

    console.log(tempArr);

    this.setState(
      {
        parr: [...tempArr],
        currPage: this.state.currPage + 1,
      },
      this.changePage
    );
  };

  handlePrevious = () => {
    if (this.state.currPage != 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changePage
      );
    }
  };

  handlePageClick = (value) => {
    if (value != this.state.currPage) {
      this.setState(
        {
          currPage: value,
        },
        this.changePage
      );
    }
  };

  handleFavourites = (movieObj) => {
    let data = JSON.parse(localStorage.getItem("movies-test") || "[]");

    if (this.state.favorites.includes(movieObj.id)) {
      data = data.filter((movie) => movie.id != movieObj.id);
    } else {
      data.push(movieObj);
    }

    localStorage.setItem("movies-test", JSON.stringify(data));

    console.log(data);

    this.handleFavoritesState();
  };

  handleFavoritesState = () => {
    let data = JSON.parse(localStorage.getItem("movies-test") || "[]");

    let temp = data.map((movie) => movie.id);

    this.setState({
      favorites: [...temp],
    });
  };

  render() {
    console.log("render second");
    return (
      <>
        <div>
          <h3 className="text-center">
            <strong>Trending</strong>
          </h3>
        </div>

        <div className="movies-list">
          {this.state.movies.map((movieElem) => (
            <div
              className="card movie-card"
              onMouseEnter={() => this.setState({ hover: movieElem.id })}
              onMouseLeave={() => this.setState({ hover: "" })}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`}
                className="card-img-top movie-img"
                alt="..."
                style={{ height: "40vh", width: "20vw" }}
              />

              <h5 className="card-title movie-title">{movieElem.original_title}</h5>

              {this.state.hover == movieElem.id && (
                <a
                  className="btn btn-primary movies-button text-center"
                  onClick={() => this.handleFavourites(movieElem)}
                >
                 {this.state.favorites.includes(movieElem.id)? 'Remove' : 'Add To favorites'}
                </a>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item ">
                <a className="page-link" onClick={this.handlePrevious}>
                  Previous
                </a>
              </li>

              {this.state.parr.map((value) => (
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => this.handlePageClick(value)}
                  >
                    {value}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a className="page-link" onClick={this.handleNext}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default MovieList;