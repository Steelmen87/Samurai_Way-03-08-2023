import {stopSubmit} from "redux-form";
import {authAPI, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';


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
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}
/*
export type setAuthUserDataType = ReturnType<typeof setAuthUserData>
export type getCaptchaUrlACType = ReturnType<typeof getCaptchaUrlAC>*/


export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
} as const)
export const getCaptchaUrlAC = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
} as const)

export const getAuthUserData = (): ThunkDispatchType => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }

}
export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkDispatchType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrlTC());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        //@ts-ignore
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const getCaptchaUrlTC = (): ThunkDispatchType =>
    async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        dispatch(getCaptchaUrlAC(response.data.url))
    }
export const logOut = (): ThunkDispatchType =>
    async (dispatch) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }

export default authReducer;

type ThunkDispatchType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
type ActionType = ReturnType<typeof setAuthUserData> | ReturnType<typeof getCaptchaUrlAC>