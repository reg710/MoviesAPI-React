import "./App.css";
import React from "react";
import Axios from "axios";

console.log(process.env.REACT_APP_API_KEY)
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL_TOP_MOVIES = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const API_URL_POSTERS = `https://api.themoviedb.org/3/movie/460465?api_key=${API_KEY}`;


// Team 1 - Meg, James, Cormac, Kevin, Regina (John)
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie_view: "false",
      topmovies: [],
      movie_id: "",
      movie_details: [],
    };

    this.runAxios = this.runAxios.bind(this);
    this.clickPosters = this.clickPosters.bind(this);
  }

  componentDidMount() {
    this.runAxios();
  }

  runAxios() {
    Axios.get(
      `${API_URL_TOP_MOVIES}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    ).then((response) => {
      // response is the whole response, it has status codes and everything
      // response.data is just the json data from the response
      // response.data.results is just the movies from the data from the response
      this.setState({ topmovies: response.data.results });
    });
  }

  clickPosters = (current_movie) => {
    console.log(current_movie);
    // this.setState({
    //   movie_view: "true",
    //   movie_id: current_movie
    // });
    Axios.get(
      `${API_URL_POSTERS}`
    ).then((response) => {
      this.setState({
        movie_details: response.data.results,
        movie_view: "true",
      });
    });
  };

  render() {
    let movies = [];
    for (let i = 0; i < this.state.topmovies.length; i++) {
      let poster =
        "https://image.tmdb.org/t/p/w500" + this.state.topmovies[i].poster_path;
      movies.push(
        <div className="movie_card">
          <img
            className="poster_thumb"
            src={poster}
            onClick={() => {
              this.clickPosters(this.state.topmovies[i].id);
            }}
          ></img>
          <div className="movie_title">{this.state.topmovies[i].title}</div>
        </div>
      );
    }

    if (this.state.movie_view === "false") {
      return (
        <div className="App">
          <header className="App-header">{movies}</header>
        </div>
      );
    } else {
      return <div>Testing - Detailed View</div>;
    }
  }
}
export default App;
