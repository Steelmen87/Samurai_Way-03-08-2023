import {stopSubmit} from "redux-form";
import {ResultCodesEnum} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/captcha-api";

let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};
export type initialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA':
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({
        type: 'auth/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const)
export const getCaptchaUrlAC = (captchaUrl: string) =>
    ({
        type: 'auth/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const)

export const getAuthUserData = (): ThunkDispatchType => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }

}
export const login = (email: string, password: string, rememberMe: boolean, captcha:
    string): ThunkDispatchType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrlTC());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        //@ts-ignore
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const getCaptchaUrlTC = (): ThunkDispatchType =>
    async (dispatch) => {
        const data = await securityAPI.getCaptchaUrl();
        dispatch(getCaptchaUrlAC(data.url))
    }
export const logOut = (): ThunkDispatchType =>
    async (dispatch) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }

export default authReducer;


type ActionType = ReturnType<typeof setAuthUserData> | ReturnType<typeof getCaptchaUrlAC>
type ThunkDispatchType<R = Promise<void>> = ThunkAction<R, AppStateType, unknown, ActionType>
