import {Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {Field} from "formik";

type validateType = {
    term: string
}
/*const validate = (values: validateType) => {
    const errors = {};
    if (!values.term) {
        //@ts-ignore
        errors.term = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.term)) {
        //@ts-ignore
        errors.term = 'Invalid email address';
    }

    //...

    return errors;
};*/
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term: string
    friend: "null" | "true" | "false"
}
export const UserFormikForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, actions: { setSubmitting: (isSubmitting: boolean) => void }) => {

        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : !!values.friend
        }

        props.onFilterChanged(filter)
    }
    return <div>
        <Formik
            initialValues={{term: '', friend: 'null'}}
            // validate={validate}
            onSubmit={submit}
        >
            {props => (
                <Form onSubmit={props.handleSubmit}>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.term}
                        name="term"
                    />
                    <Field name="friend" as="select">
                        <option value="null">all</option>
                        <option value="true">only followed</option>
                        <option value="false">only unfollowed</option>
                    </Field>
                    {props.errors.term && <div id="feedback">{props.errors.term}</div>}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
})