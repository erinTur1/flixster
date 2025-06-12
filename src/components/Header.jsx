import '../styles/Header.css';
import logo from '../assets/flixster_logo.png';
import SearchForm from './SearchForm';
import SortForm from './SortForm';

const Header = ({searchQuery, onSearchChange}) => {
    return (<header>
        <div className="title-div">
            <span>
                <img id="logo-img" src={logo} alt="image of logo of Flixster"/>
                <h1>Flixster</h1>
            </span>
        </div>
    </header>)
}

export default Header;