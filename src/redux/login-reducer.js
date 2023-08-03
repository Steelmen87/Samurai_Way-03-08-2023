import {authAPI} from "../api/api";

const SET_LOGIN = 'SET_LOGIN';


let initialState = {
    email: null,
    password: null,
    rememberMe: null,
    captcha: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                email: action.email,
                password: action.password,
                rememberMe: action.rememberMe
            }
        default:
            return state;
    }
}


export const setLogin = (email, password, rememberMe,captcha) => ({type: SET_LOGIN, data: {email, password, rememberMe,captcha}  })
export const setLoginData = () => (dispatch) => {
    authAPI.login()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {email, password, rememberMe} = response.data.data;
                dispatch(setLogin(email, password, rememberMe));
            }
        });
}

export default loginReducer;