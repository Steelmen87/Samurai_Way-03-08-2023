import {FormAction, FormErrors, stopSubmit} from "redux-form";
import {photosType, postType, profileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {usersAPI} from "../api/users-api";
import {profileAPI} from "../api/profile-api";


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<postType>,
    profile: null as profileType | null,
    status: "",
    newPostText: ""
};
export type initialStateType = typeof initialState

export const profileReducer = (state = initialState, action: actionType): initialStateType => {

    switch (action.type) {
        case 'ADD-POST': {
            let newPost = {
                id: 5,
                message: action.value,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case 'DELETE-POST': {
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.id)
            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as profileType
            }
        default:
            return state;
    }
}

export const deletePost = (id: number) => ({type: 'DELETE-POST', id} as const)
export const addPostActionCreator = (value: string) => ({type: 'ADD-POST', value} as const)
export const setUserProfile = (profile: profileType) => ({type: 'SET_USER_PROFILE', profile} as const)
export const setStatus = (status: string) => ({type: 'SET_STATUS', status} as const)
export const savePhotoSuccess = (photos: photosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)

type stopSubmitType = (form: string, errors?: FormErrors<any, any>) => FormAction

type DispatchThunkType = ThunkAction<Promise<void>, AppStateType, unknown, actionType>

export const getUserProfile = (userId: number): DispatchThunkType =>
    async (dispatch) => {
        let data = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(data));
    }

export const getStatus = (userId: number): DispatchThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(setStatus(data));
    }

export const updateStatus = (status: string): DispatchThunkType =>
    async (dispatch) => {
        try {
            let data = await profileAPI.updateStatus(status)
            if (data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        } catch (e) {
            //обработка ошибки
        }
    }
export const savePhoto = (file: any): DispatchThunkType =>
    async (dispatch) => {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
export const saveProfile = (profile: profileType): DispatchThunkType => async (dispatch, getState: any) => {
    let data = await profileAPI.saveProfile(profile)
    const userId = getState().auth.userId;
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        //@ts-ignore
        dispatch(stopSubmit("profile-data", {_error: data.messages[0]}))
        return Promise.reject({_error: data.messages[0]})
    }
}

export default profileReducer;

export type deletePostType = ReturnType<typeof deletePost>
export type addPostActionCreatorType = ReturnType<typeof addPostActionCreator>
export type setUserProfileType = ReturnType<typeof setUserProfile>
export type setStatusType = ReturnType<typeof setStatus>
export type savePhotoSuccessType = ReturnType<typeof savePhotoSuccess>
export type actionType =
    deletePostType
    | addPostActionCreatorType
    | setUserProfileType
    | setStatusType
    | savePhotoSuccessType