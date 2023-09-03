import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "./../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'
import {AppStateType} from "../../redux/redux-store";

export const LoginForm: React.FC<InjectedFormProps<FormDataType, loginOwnProps> & loginOwnProps> = (props) => {
    return <>
        <form onSubmit={props.handleSubmit}>
            <div><Field
                validate={[requiredField]}
                component={Input} name={"email"} placeholder={"Login"}/></div>
            <div><Field
                validate={[requiredField]}
                component={Input} name={"password"} placeholder={"Password"} type={"password"}/></div>
            <div><Field
                type="checkbox" name={"rememberMe"} component={Input} placeholder={"checkbox"}/>
            </div>
            {props.captchaUrl && <div><img alt={'captchaUrl'} src={props.captchaUrl}/>
                <div><Field
                    validate={[requiredField]}
                    component={Input} name={"captcha"} placeholder={"captcha"}/>
                </div>
            </div>}

            {props.error && <div className={style.errorSummary}>{props.error}</div>}
            <button>Login</button>
        </form>
    </>
}
const LoginReduxForm = reduxForm<FormDataType, loginOwnProps>({form: 'login'})(LoginForm)
type FormDataType = {
    captcha: string | null
    rememberMe: boolean
    password: string
    email: string
}
type loginOwnProps = {
    captchaUrl: string | null
}

type mapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type mapDispatchPropsType = {
    setLoginData: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type formDataType = {
    email: string, password: string, rememberMe: boolean, captcha: any
}
const Login: React.FC<mapStateToPropsType & mapDispatchPropsType> = (props) => {
    const onSubmit = (formData: formDataType) => {
        props.setLoginData(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) return <Redirect to={'/profile'}/>
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state: AppStateType) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, {setLoginData: login})(Login);
