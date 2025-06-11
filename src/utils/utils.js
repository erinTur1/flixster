const parseMovieData = (movieData) => {
    return (
        {
            movieTitle: movieData.title,
            movieImg: movieData.poster_path,
            movieRating: movieData.vote_average,
            movieOverview: movieData.overview,
            movieReleaseDate: movieData.release_date,
        }
    )
    
}

export {parseMovieData};
