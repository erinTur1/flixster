import '../SearchForm.css';

function SearchForm() {
    return (
        <div className="search-form">
            <form>
                <input type="text" id="title" name="movie-title" />
                <input type="submit" value="Search" />
            </form>
       </div>
    )
}

export default SearchForm;