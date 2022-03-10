import errorImg from './error.png';

import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <div className="errorBlock">
            <h1>Something went wrong, please try it later:(</h1>
            <img className="errorImg" src={errorImg} alt="Error"/>
        </div>
    )
}

export default ErrorMessage;