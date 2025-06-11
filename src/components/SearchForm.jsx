import { useState } from 'react'
import '../styles/SearchForm.css';

function SearchForm({searchQuery1, onSearchChange, onSubmitSearch}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newSearchQuery = formData.get('movie-title');
        onSubmitSearch(newSearchQuery);
        event.target.reset();
    }

    const handleSearchChange = (event) => {
        onSearchChange(event.target.value);
    }

    return (
        <div className="search-form" onSubmit={handleSubmit}>
            <form>
                <input type="text" id="title" name="movie-title" placeholder="Search for movies" onChange={handleSearchChange} value={searchQuery1}/>
                <input type="submit" value="Search" />
            </form>
       </div>
    )
}

export default SearchForm;