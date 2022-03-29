import {useEffect, useState} from 'react';
import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {

    const [character, setCharacter] = useState({});

    const {loading, error, getCharacterInfo, clearError} = useMarvelService();

    const onCharLoaded = (charInfo) => {
        setCharacter(charInfo);
    }

    const setRandomChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacterInfo(id).then(onCharLoaded);
    }

    useEffect(() => {
        setRandomChar();
    }, []);


    const onTryItClick = () => {
        setRandomChar();
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <CharacterView characterInfo={character}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {content}
            {spinner}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={onTryItClick} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const CharacterView = ({characterInfo: {name, description, thumbnail, homepage, wiki}}) => {
    let notFoundImgStyle;
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif") {
        notFoundImgStyle = {objectFit: 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img style={notFoundImgStyle} src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description ? description : 'This character does not have a description.'}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;