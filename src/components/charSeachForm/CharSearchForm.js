import {Formik, Form, Field, ErrorMessage, useField} from "formik";
import * as Yup from "yup";

import "./charSearchForm.scss";

const CharSearchForm = () => {

    const MyTextInput = ({label, ...props}) => {
        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.name}>{label}</label>
                <input {...props} {...field}/>
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </>
        )
    };

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
            <MyTextInput
                label="Enter name"
                name="name"
        />
        </Form>
    </Formik>
    )
}

export default CharSearchForm;