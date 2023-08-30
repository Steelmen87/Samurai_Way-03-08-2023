import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_INITIALIZED = 'SET_INITIALIZED';

export type initialStateType = {
    initialized: boolean
    globalError: null | string
}

let initialState: initialStateType = {
    initialized: false,
    globalError: null
};

const appReducer = (state = initialState, action: ActionType): initialStateType => {
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


export const initializedSuccess = () => ({type: SET_INITIALIZED,} as const)

export const initializeApp = (): ThunkActionType => async (dispatch) => {
    dispatch(getAuthUserData())
        .then(() => {
            dispatch(initializedSuccess())
        })


}


export default appReducer;

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
type ActionType = initializedSuccessActionType
export type initializedSuccessActionType = ReturnType<typeof initializedSuccess>