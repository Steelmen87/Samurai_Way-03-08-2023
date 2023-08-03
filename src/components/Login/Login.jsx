import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {setLoginData} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

export const LoginForm = (props) => {

    return <>
        <form onSubmit={props.handleSubmit}>
            <div><Field
                validate={[requiredField]}
                component={Input} name={"login"} placeholder={"Login"}/></div>
            <div><Field
                validate={[requiredField]}
                component={Input} name={"password"} placeholder={"Password"} type={"password"}/></div>
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
        props.setLoginData(formData.login, formData.password, formData.rememberMe)
    }
    if (props.isAuth) return <Redirect to from={'/profile'}/>
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, {setLoginData})(Login);
