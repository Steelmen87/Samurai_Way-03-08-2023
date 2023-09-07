import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "./../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
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


type formDataType = {
    email: string, password: string, rememberMe: boolean, captcha: any
}
const Login: React.FC = (props) => {
    const captchaUrl = useSelector<AppStateType, string | null>(state => state.auth.captchaUrl)
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch();
    const onSubmit = (formData: formDataType) => {
        //@ts-ignore
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) return <Redirect to={'/profile'}/>
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

export default Login;
