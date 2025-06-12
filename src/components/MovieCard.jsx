import { parseMovieData } from '../utils/utils';
import '../styles/MovieCard.css'


const MovieCard = ({data, displayModal}) => {

  //MovieCard is passed an object of movie details for each movie, parse so we only get the desired details
  const parsedData = data ? parseMovieData(data) : [];

  //callback function that is triggered when a MovieCard is clicked
  const handleDisplayModal = () => {
    //calls displayModal located in MovieList.jsx and passes only the id of the movie
    displayModal(parsedData.movieId);
  }

  return (
    <div className="movie-card" onClick={handleDisplayModal}>
        <img src={"https://image.tmdb.org/t/p/w500" + parsedData.movieImg} alt={"poster image of " + parsedData.movieTitle}/>
        <p>{parsedData.movieTitle}</p>
        <p>Vote average: {parsedData.movieRating}</p>
    </div>
  )
}

export default MovieCard;