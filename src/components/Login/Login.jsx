import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators.ts";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'

export const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <>
        <form onSubmit={handleSubmit}>
            <div><Field
                validate={[requiredField]}
                component={Input} name={"login"} placeholder={"Login"}/></div>
            <div><Field
                validate={[requiredField]}
                component={Input} name={"password"} placeholder={"Password"} type={"password"}/></div>
            <div><Field
                type="checkbox" name={"rememberMe"} component={Input} placeholder={"checkbox"}/>
            </div>
            {captchaUrl && <div><img alt={'captchaUrl'} src={captchaUrl}/>
                <div><Field
                    validate={[requiredField]}
                    component={Input} name={"captcha"} placeholder={"captcha"}/>
                </div>
            </div>}

            {error && <div className={style.errorSummary}>{error}</div>}
            <button>Login</button>
        </form>
    </>
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.setLoginData(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) return <Redirect to={'/profile'}/>
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state) => {
    debugger
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, {setLoginData: login})(Login);
