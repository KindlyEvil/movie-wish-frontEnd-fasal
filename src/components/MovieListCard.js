import { useEffect, useState } from 'react'

function MovieListCard(props) {

  const [movie,setMovie]=useState(null);
  const {imdbID}=props;
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=b6e41423`)
      .then(res => res.json())
      .then(data => setMovie(data))
  }, [imdbID])

  return (
    <div className="movieContainer" style={{ color: "white",maxHeight:"17cm" }}>
      {movie ? <>
        <div className="moviePosterContainer" style={{border: "1px solid red", maxWidth:"fit-content", marginLeft:"24cm", padding:"4px"}}>
          <img style={{ height: "400px", width: "500px", maxWidth: "400px" }}
            src={movie.Poster}
            alt={`${movie.Title} Poster`}
          />
        </div>
        <div className="movieDetailsContainer">
          <div>
            <h1 style={{ fontSize: "50px", maxWidth:"fit-content", position:"relative", top:"-10cm"}}>{movie.Title}</h1>
          </div>
          <div className="detailsContainer" style={{maxWidth:"fit-content", position:"relative", top:"-9cm"}}>
            <div className="movieDescWatchlist" style={{ color: "#D72323" }}>
              <h1>IMDB Rating: {movie.imdbRating}</h1>
              <h1>IMDB Votes:{movie.imdbVotes}</h1>
            </div>
            <div className="movieDescWatchlist" style={{ color: "#1FAB89" }}>
              <h1>{movie.Type === "series" ? "Series" : "Movie"}</h1>
              <h1>{movie.Genre}</h1>
              <h1>{movie.Year}</h1>
            </div>

            <div className="movieDescWatchlist">
              <h2>{movie.Plot}</h2>
            </div>
          </div>
        </div>
      </> : ""}
    </div>
  )
}

export default MovieListCard;