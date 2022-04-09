import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import useMarvelService from "../../services/useMarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './comicsList.scss';


const ComicsList = () => {
    const {loading, error, getComicsList, clearError} = useMarvelService();

    const [comicsData, setComicsData] = useState([]);
    const [charListEnded, setCharListEnded] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(210);

    const onComicsListLoaded = (newComicsData) => {
        if (newComicsData.length < 8) {
            setCharListEnded(true);
        }

        setComicsData([...comicsData, ...newComicsData]);
        setLoadingMore(false);
        setOffset(offset => offset + 8);
    }

    const updateComicsList = (offset, initial) => {
        clearError()
        initial ? setLoadingMore(false) : setLoadingMore(true);
        getComicsList(offset).then(onComicsListLoaded);
    }

    useEffect(() => {
        updateComicsList(offset, true);
    }, []);


    const comicsListItems = comicsData.map((comicsListItem, i) => {
        return (
            <CSSTransition timeout={500} classNames={'comics__item-transition'} className={'comics__item'} key={i}>
                <ComicsListItem thumbnail={comicsListItem.thumbnail}
                                title={comicsListItem.title}
                                price={comicsListItem.price}
                                id={comicsListItem.id}/>
            </CSSTransition>
        )
    })

    const spinner = loading && !loadingMore ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const styleButton = {'display': charListEnded ? 'none' : 'block'};

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                <TransitionGroup className="comics__transitionGroup comics__grid">
                    {comicsListItems}
                </TransitionGroup>
            </ul>
            <button style={styleButton} disabled={loadingMore} onClick={() => updateComicsList(offset, false)}
                    className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ComicsListItem = ({thumbnail, title, price, id}) => {

    return (
        <li className="comics__item">
            <NavLink to={`${id}`}>
                <img src={thumbnail} alt={title} className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}</div>
            </NavLink>
        </li>
    )
}

export default ComicsList;