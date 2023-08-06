import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }

        default:
            return state;
    }
}


export const initializedSuccess = () => ({type: SET_INITIALIZED,})

export const initializeApp = () => (dispatch) => {
    dispatch(getAuthUserData())
        .then(() => {
            dispatch(initializedSuccess())
        })


}


export default appReducer;