import { useEffect, useState } from "react";
import { BrowserRouter as Router, useParams, Link } from "react-router-dom";
import axios from "axios";
import MoviesCard from "./moviesCard";

function MoviesLists() {
    const [moviesListCards, setMoviesListCards] = useState([]);

  let { id, name } = useParams();

  useEffect(async () => {
    var c = await axios.get(
      `https://api.themoviedb.org/3/genre/${id}/movies?api_key=fed69657ba4cc6e1078d2a6a95f51c8c`
    );

    console.log("c", c.data.results);
    setMoviesListCards(c.data.results);
  }, [id]);

  return <div className="App">
      <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>

      {moviesListCards.map((item) => (
          <MoviesCard key = {item.id} movie = {item} />
          ))}

      </div>

      



  </div>;
}

export default MoviesLists;
