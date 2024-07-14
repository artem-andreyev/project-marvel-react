import './charList.scss';
import { Component } from 'react';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharsLoaded = (chars) => {
        this.setState({
            chars, // ({char : char})
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const ids = Array.from({ length: 9 }, () => Math.floor(Math.random() * (1011400 - 1011000) + 1011000));
        Promise.all(ids.map(id => this.marvelService.getCharacter(id)))
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    componentDidMount() {
        this.updateChar();
    }

    render () {
        const { chars, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        const items = chars.map((char, i) => {
            return (
                <li className="char__item" key={i}>
                    <img src={char.thumbnail} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        });

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                
                <ul className="char__grid">
                    {!loading && !error && items}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;