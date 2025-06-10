import '../MovieCard.css'
import PlaceHolderImg from '../assets/movie-img-placeholder.png';

const MovieCard = ({img, title, rating}) => {
  return (
    <div className="movie-card">
        <img src={"https://image.tmdb.org/t/p/w500" + img}/>
        <p>{title}</p>
        <p>{rating}</p>
    </div>
  )
}

export default MovieCard;