import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import useMarvelService from "../../services/useMarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './charList.scss';


const CharList = ({onCharSelected}) => {

    const [characters, setCharacters] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charListEnded, setCharListEnded] = useState(false);
    const [prevClickedChar, setPrevClickedChar] = useState(null);

    const {loading, error, getCharactersList} = useMarvelService();

    const onCharListLoaded = (newCharListInfo) => {
        if (newCharListInfo.length < 9) {
            setCharListEnded(true);
        }

        setCharacters(characters => [...characters, ...newCharListInfo]);
        setLoadingMore(false);
        setOffset(offset => offset + 9);
    };

    const updateCharList = (offset, initial) => {
        initial ? setLoadingMore(false) : setLoadingMore(true);
        getCharactersList(offset).then(onCharListLoaded);
    }

    useEffect(() => {
        updateCharList(offset, true)
    }, []);

    const onCharFocused = (charRef) => {
        if (charRef.current) charRef = charRef.current;

        if (prevClickedChar) prevClickedChar.classList.remove("char__item_selected");

        charRef.classList.add("char__item_selected");
        charRef.focus();

        setPrevClickedChar(charRef);
    }


    const charItemsList = characters.map(characterInfo => {
        return (
            <CSSTransition key={characterInfo.id} timeout={500} classNames="char__transition">
                <CharacterItem onCharSelected={() => onCharSelected(characterInfo.id)}
                               name={characterInfo.name} thumbnail={characterInfo.thumbnail}
                               onCharFocused={onCharFocused}/>
            </CSSTransition>
        )
    })

    const spinner = loading && !loadingMore ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const styleButton = {'display': charListEnded ? 'none' : 'block'};

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <ul className="char__grid">
                <TransitionGroup className="char__transitionGroup char__grid">
                    {charItemsList}
                </TransitionGroup>
            </ul>
            <button style={styleButton} onClick={() => updateCharList(offset, false)}
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