import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/useMarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

import './charInfo.scss';

const CharInfo = ({charSelectedId}) => {

    const [character, setCharacter] = useState(null);

    const {loading, error, getCharacterInfo, clearError} = useMarvelService();

    const onCharLoaded = (charInfo) => {
        setCharacter(charInfo);
    };

    const setCharInfo = (id) => {
        clearError();
        if (!id) return;
        getCharacterInfo(id).then(onCharLoaded);
    }

    useEffect(() => {
        setCharInfo(charSelectedId)
    }, [charSelectedId]);

    const skeleton = character || error || loading ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !character) ? <CharacterView characterInfo={character}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

CharInfo.propTypes = {
    charSelectedId: PropTypes.number
}

const CharacterView = ({characterInfo, maxComicsLength = 10}) => {
    let {name, thumbnail, description, homepage, wiki, comics} = characterInfo;

    if (maxComicsLength) {
        comics = comics.slice(0, maxComicsLength)
    }

    let notFoundImgStyle;
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif") {
        notFoundImgStyle = {objectFit: 'contain'};
    }

    const comicsList = comics.map((comics, i) => {
        return (
            <li key={i} className="char__comics-item">
                {comics.name}
            </li>
        )
    })

    return (
        <>
            <div className="char__basics">
                <img style={notFoundImgStyle} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            {
                comics.length > 0 &&
                <>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {comicsList}
                    </ul>
                </>
            }
        </>
    )
}

export default CharInfo;