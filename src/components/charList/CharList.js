import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './charList.scss';

const CharList = ({onCharSelected}) => {

    const [characters, setCharacters] = useState([]);
    const [firstLoading, setFirstLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charListEnded, setCharListEnded] = useState(false);
    const [prevClickedChar, setPrevClickedChar] = useState(null);

    const marvelService = new MarvelService();

    const onCharListLoaded = (newCharListInfo) => {
        if (newCharListInfo.length < 9) {
            setCharListEnded(true);
        }

        setCharacters(characters => [...characters, ...newCharListInfo]);
        setFirstLoading(false);
        setLoadingMore(false);
        setOffset(offset => offset + 9);
    };

    const onCharListLoadingMore = () => setLoadingMore(true);

    const onError = () => {
        setFirstLoading(false);
        setError(true);
    }

    const setCharList = (offset) => {
        onCharListLoadingMore();

        marvelService.getCharactersList(offset).then(onCharListLoaded).catch(onError);
    }


    useEffect(() => {
        setCharList()
    }, []);

    const onCharFocused = (charRef) => {
        if (charRef.current) charRef = charRef.current;

        if (prevClickedChar) prevClickedChar.classList.remove("char__item_selected");

        charRef.classList.add("char__item_selected");
        charRef.focus();

        setPrevClickedChar(charRef);
    }


    const charItemsList = characters.map(characterInfo => {
        return <CharacterItem key={characterInfo.id}
                              onCharSelected={() => onCharSelected(characterInfo.id)}
                              name={characterInfo.name} thumbnail={characterInfo.thumbnail}
                              onCharFocused={onCharFocused}/>
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
            <button style={styleButton} onClick={() => setCharList(offset)}
                    className="button button__main button__long"
                    disabled={loadingMore}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

const CharacterItem = ({name, thumbnail, onCharSelected, onCharFocused}) => {

    const charRef = useRef(null);

    let notFoundImgStyle;
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif") {
        notFoundImgStyle = {objectFit: 'contain'};
    }

    return (
        <li ref={charRef}
            onClick={() => {
                onCharSelected();
                onCharFocused(charRef)
            }}
            onKeyPress={e => {
                if (e.key === ' ' || e.key === "Enter") {
                    onCharSelected();
                    onCharFocused(charRef);
                }
            }}
            tabIndex={0}
            className="char__item">
            <img style={notFoundImgStyle} src={thumbnail} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    )
}


CharacterItem.propTypes = {
    name: PropTypes.any,
    thumbnail: PropTypes.any,
    onCharSelected: PropTypes.any
}

export default CharList;