import { useState } from 'react'
import '../styles/SearchForm.css';

function SearchForm({searchRequest, onSearchChange, onSubmitSearch}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        let submitEvent = event.nativeEvent.submitter.getAttribute("name");
        if (submitEvent === "search") {
            const formData = new FormData(event.target);
            const newSearchQuery = formData.get('movie-title');
            onSubmitSearch(newSearchQuery);
        } else if (submitEvent === "clear") {
            onSubmitSearch('');
            event.target.reset();
        }
    }

    const handleSearchChange = (event) => {
        onSearchChange(event.target.value);
    }

    return (
        <div className="search-form" onSubmit={handleSubmit}>
            <form>
                <input type="text" id="title" name="movie-title" placeholder="Search for movies" onChange={handleSearchChange} value={searchRequest}/>
                <input type="submit" name="search" value="Search" />
                <input type="submit" name="clear" value="Clear" />
            </form>
       </div>
    )
}

export default SearchForm;