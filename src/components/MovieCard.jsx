import '../styles/MovieCard.css'
import { parseMovieData } from '../utils/utils';

const MovieCard = ({data, displayModal}) => {

  //IMPORTANT!:
  //consider having a data object passed to MovieCard and a separate parseData() function included in utils and used here
    //move the state to App.jsx?

  const parsedData = data ? parseMovieData(data) : [];

  const handleDisplayModal = () => {
    displayModal(
      {
        title: parsedData.movieTitle,
        img: parsedData.movieImg,
        release_date: parsedData.movieReleaseDate,
        overview: parsedData.movieOverview,
      }
    );
  }

  return (
    <div className="movie-card" onClick={handleDisplayModal}>
        <img src={"https://image.tmdb.org/t/p/w500" + parsedData.movieImg}/>
        <p>{parsedData.movieTitle}</p>
        <p>Vote average: {parsedData.movieRating}</p>
    </div>
  )
}

export default MovieCard;