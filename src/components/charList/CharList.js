import React, {Component} from "react";

import MarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './charList.scss';
import PropTypes from "prop-types";

class CharList extends Component {
    state = {
        characters: [],
        firstLoading: true,
        error: false,
        loadingMore: false,
        offset: 210,
        charListEnded: false,
        prevClickedChar: null
    }

    marvelService = new MarvelService();

    onCharListLoaded = (newCharListInfo) => {
        if (newCharListInfo.length < 9) {
            this.setState({charListEnded: true});
        }

        this.setState(({characters, offset}) => {
            return {
                characters: [...characters, ...newCharListInfo],
                firstLoading: false,
                loadingMore: false,
                offset: offset + 9
            }
        })
    };

    onCharListLoadingMore = () => this.setState({
        loadingMore: true
    })

    onError = () => this.setState({
        firstLoading: false,
        error: true
    })

    setCharList = (offset) => {
        this.onCharListLoadingMore();

        this.marvelService.getCharactersList(offset).then(this.onCharListLoaded).catch(this.onError);
    }

    componentDidMount() {
        this.setCharList();
    }

    onCharFocused = (charRef) => {
        if (charRef.current) charRef = charRef.current;
        const {prevClickedChar} = this.state;

        if (prevClickedChar) prevClickedChar.classList.remove("char__item_selected");
        debugger
        charRef.classList.add("char__item_selected");
        charRef.focus();

        this.setState({prevClickedChar: charRef})
    }

    render() {
        const {characters, firstLoading, error, loadingMore, offset, charListEnded} = this.state;
        const {onCharSelected} = this.props;

        const charItemsList = characters.map(characterInfo => {
            return <CharacterItem key={characterInfo.id}
                                  onCharSelected={() => onCharSelected(characterInfo.id)}
                                  name={characterInfo.name} thumbnail={characterInfo.thumbnail}
                                  onCharFocused={this.onCharFocused}/>
        })

        const spinner = firstLoading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(errorMessage || spinner) ? charItemsList : null;
        const styleButton = {'display': charListEnded ? 'none' : 'block'};

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button style={styleButton} onClick={() => this.setCharList(offset)}
                        className="button button__main button__long"
                        disabled={loadingMore}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

class CharacterItem extends Component {

    charRef = React.createRef();

    render() {
        let {name, thumbnail, onCharSelected, onCharFocused} = this.props;

        let notFoundImgStyle;
        if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif") {
            notFoundImgStyle = {objectFit: 'contain'};
        }


        return (
            <li ref={this.charRef}
                onClick={() => {
                    onCharSelected();
                    onCharFocused(this.charRef)
                }}
                onKeyPress={e => {
                    if (e.key === ' ' || e.key === "Enter") {
                        onCharSelected();
                        onCharFocused(this.charRef);
                    }
                }}
                tabIndex={0}
                className="char__item">
                <img style={notFoundImgStyle} src={thumbnail} alt="abyss"/>
                <div className="char__name">{name}</div>
            </li>
        )
    }
}

CharacterItem.propTypes = {
    name: PropTypes.any,
    thumbnail: PropTypes.any,
    onCharSelected: PropTypes.any
}

export default CharList;