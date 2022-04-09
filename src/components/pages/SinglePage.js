import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/useMarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {error, loading, getCharacterInfo, getComicInfo, clearError} = useMarvelService();

    useEffect(() => updateData(), []);

    const onDataLoaded = (data) => {
        setData(data)
    }

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'character' :
                getCharacterInfo(id).then(onDataLoaded)
                break
            case 'comic' :
                getComicInfo(id).then(onDataLoaded)
                break
            default :
                throw new Error('data type is wrong')
        }
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={{...data}}/> : null;

    return (
        <>
            <AppBanner/>
            <div className="single-comic">
                {errorMessage}
                {spinner}
                {content}
            </div>
        </>
    )
}

export default SinglePage