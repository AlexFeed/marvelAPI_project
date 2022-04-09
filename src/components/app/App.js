import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {lazy, Suspense} from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('./../pages/404Page/Page404'));
const MainPage = lazy(() => import('./../pages/MainPage'));
const ComicsPage = lazy(() => import('./../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = (props) => {

    return (
        <BrowserRouter basename={"marvelAPI_project"}>
            <Suspense fallback={<Spinner/>}>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id"
                                   element={<SinglePage Component={SingleComicLayout} dataType={'comic'}/>}/>
                            <Route path={"/characters/:id"}
                                   element={<SinglePage Component={SingleCharacterLayout} dataType={'character'}/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </main>
                </div>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;