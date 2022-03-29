import {useEffect, useState} from "react";
import {NavLink, useMatch} from "react-router-dom";

import MarvelService from "../../../services/MarvelService";

import ErrorMessage from "../../errorMessage/ErrorMessage";
import Spinner from "../../spinner/Spinner";
import AppBanner from "../../appBanner/AppBanner";

import './singleComicPage.scss';


const SingleComicPage = () => {
    const {url, path, params: {comicId}} = useMatch("/comics/:comicId");

    const {loading, error, getComicInfo, clearError} = MarvelService();

    const [comic, setComic] = useState(null);
    const onGetComicInfoLoaded = (comicInfo) => setComic(comicInfo);

    const setComicInfo = () => {
        clearError();

        getComicInfo(comicId).then(onGetComicInfoLoaded)
    }

    useEffect(() => {
        setComicInfo()
    }, [comicId])


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <SingleComicPageView {...comic}/> : null;

    return (
        <>
            <AppBanner/>
            <div className="single-comic">
                {errorMessage}
                {spinner}
                {content}
                <NavLink to={'/comics'} className="single-comic__back">Back to all</NavLink>
            </div>
        </>
    )
}

const SingleComicPageView = ({title, description, pageCount, language, price, thumbnail}) => {
    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
        </>
    )
}

export default SingleComicPage;