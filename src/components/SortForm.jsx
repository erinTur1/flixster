import '../SortForm.css';

function SortForm() {
    return (
        <div className="sort-form">
            <select name="sort-by" id="sort-input" defaultValue="">
                <option disabled value="">Sort by...</option>
                <option value="title">Title (A-Z)</option>
                <option value="release">Release Date (most recent to oldest)</option>
                <option value="vote-avg">Vote Average (highest to lowest)</option>
            </select>
       </div>
    )
}

export default SortForm;