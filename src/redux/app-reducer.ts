import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

let initialState = {
    initialized: false,
    globalError: null
};
export type initialStateType = typeof initialState
const appReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'SN/APP/SET_INITIALIZED':
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: 'SN/APP/SET_INITIALIZED',} as const)

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