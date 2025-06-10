import '../Header.css';
import SearchForm from './SearchForm';
import SortForm from './SortForm';

const Header = () => {
    return (<header>
        <SearchForm />
        <div className="title-div">
            <h1>Flixster</h1>
        </div>
        <SortForm />
    </header>)
}

export default Header;