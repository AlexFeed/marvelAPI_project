import {ErrorMessage as FormikErrorMessage, Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import {useState} from "react";
import {Link} from "react-router-dom";

import useMarvelService from "../../services/useMarvelService";

import './findCharForm.scss';
import ErrorMessage from "../errorMessage/ErrorMessage";


const FindCharForm = () => {
    const {loading, error, getCharacterByName, clearError} = useMarvelService();
    const [charData, setCharData] = useState(null);


    const initialValues = {
        charName: ''
    }

    const onCharLoaded = (charInfo) => {
        setCharData(charInfo)
    }

    const onSubmit = values => {
        clearError();
        getCharacterByName(values.charName).then(onCharLoaded)
    }

    const validationSchema = yup.object({
        charName: yup.string().required('This field is required')
    })

    const CharMatchLayout = ({char}) => {
        return (
            <div className="char__search-wrapper">
                <div className="char__search-success">There is! Visit {char.name} page?</div>
                <Link to={`/characters/${char.id}`} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
            </div>
        )
    }

    const NoMatchLayout = () => {
        return (
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>
        )
    }

    let results;

    if (charData) {
        results = charData.length > 0 ? <CharMatchLayout char={charData[0]}/> : <NoMatchLayout/>;
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;

    return (
        <div className="char__search-form">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label className="char__search-label" htmlFor={'find character by name'}>Or find a character by
                        name:</label>
                    <div className="char__search-wrapper">
                        <Field id="charName" name={'charName'} type={'text'} placeholder="Enter name"/>
                        <button type="submit" className="button button__main">
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default FindCharForm;