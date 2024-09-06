import {useState} from "react";
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage, useField} from "formik";
import * as Yup from "yup";
import {Link} from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded);
    }

    return (
        <Formik
        initialValues ={{
            name: ""
        }}
        validationSchema = {Yup.object({
            name: Yup.string()
                    .required("This field is required")
        })}
        onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
    >
        <Form className='form'>
            <h2>Or find a character by name: </h2>
            <input
                label="Enter name"
                name="name"
        />
        </Form>
    </Formik>
    )
}

export default CharSearchForm;