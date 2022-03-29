import {NavLink} from "react-router-dom";

import './Page404.scss';

const Page404 = () => {
    return (
        <div className="error404__container">
            <video width="100%" autoPlay muted loop playsInline>
                <source
                    src="https://d33wubrfki0l68.cloudfront.net/8b6d9610807c6d28fb5a28a2375cc7f17e423ca3/c2dc3/video/404.mp4"
                    type="video/mp4"/>
            </video>
            <div className="error404__content">
                <h1 className="error404__title">What on earth are you doing here!?</h1>
                <p className="error404__subtitle">Well, this is awkward, the page you were trying to view does not exist.</p>
                <NavLink className="error404__link" to="/">Get yourself home</NavLink>
            </div>
        </div>
    )
}

export default Page404;