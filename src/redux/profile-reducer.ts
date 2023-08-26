import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postType, profileType} from "../types/types";

export const ADD_POST = 'ADD-POST';
export const DELETE_POST = 'DELETE-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


/*type initialStateType = {
    profile:profileType | null
    posts:Array<postType>
    status:string
}*/

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
type initialStateType = typeof initialState

export const profileReducer = (state = initialState, action: actionType): initialStateType => {

    switch (action.type) {
        case ADD_POST: {
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
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.id)
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case "SAVE_PHOTO_SUCCESS":
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

export const deletePost = (id: number) => ({type: DELETE_POST, id} as const)
export const addPostActionCreator = (value: string) => ({type: ADD_POST, value} as const)
export const setUserProfile = (profile: profileType) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status} as const)
export const savePhotoSuccess = (photos: photosType) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)

export const getUserProfile = (userId: string) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: string) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (e) {
        //обработка ошибки
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
    let response = await profileAPI.saveProfile(profile)
    const userId = getState().auth.userId;
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("profile-data", {_error: response.data.messages[0]}))
        return Promise.reject({_error: response.data.messages[0]})
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