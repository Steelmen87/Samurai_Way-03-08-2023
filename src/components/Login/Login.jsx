import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";

export const LoginForm = (props) => {

    return <>
        <form onSubmit={props.handleSubmit}>
            <div><Field
                validate={[requiredField]}
                component={Input} name={"login"} placeholder={"Login"}/></div>
            <div><Field
                validate={[requiredField]}
                component={Input} name={"password"} placeholder={"Password"}/></div>
            <div><Field
                type="checkbox" name={"rememberMe"} component={Input} placeholder={"checkbox"}/></div>
            <button>Login</button>
        </form>
    </>
}
const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)
const Login = (props) => {
    const onSubmit = (formData) => {

    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login;
