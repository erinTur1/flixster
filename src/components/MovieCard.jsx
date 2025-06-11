import '../styles/MovieCard.css'

const MovieCard = ({img, title, rating, displayModal}) => {

  //IMPORTANT!:
  //consider having a data object passed to MovieCard and a separate parseData() function included in utils and used here
    //move the state to App.jsx?

  const handleDisplayModal = () => {
    displayModal(title);
  }

  return (
    <div className="movie-card" onClick={handleDisplayModal}>
        <img src={"https://image.tmdb.org/t/p/w500" + img}/>
        <p>{title}</p>
        <p>{rating}</p>
    </div>
  )
}

export default MovieCard;