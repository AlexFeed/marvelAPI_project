import {useState} from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";
import FindCharForm from "../findChar/FindCharForm";


const MainPage = () => {
    const [selectedCharId, setSelectedCharId] = useState(0);

    const onCharSelected = (id) => {
        setSelectedCharId(id)
    };


    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charSelectedId={selectedCharId}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <FindCharForm/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;