import {getAuthUserData} from "./auth-reducer";
const SET_INITIALIZED = 'SET_INITIALIZED';

export type initialStateType = {
    initialized: boolean
    globalError:null | string
}

let initialState: initialStateType = {
    initialized: false,
    globalError:null
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

export const initializeApp = () => (dispatch: any) => {
    dispatch(getAuthUserData())
        .then(() => {
            dispatch(initializedSuccess())
        })


}


export default appReducer;


type ActionType = initializedSuccessActionType
export type initializedSuccessActionType = ReturnType<typeof initializedSuccess>