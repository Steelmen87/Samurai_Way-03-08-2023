import {profileAPI, usersAPI} from "../api/api";

export const ADD_POST = 'ADD-POST';
export const DELETE_POST = 'DELETE-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    profile: null,
    status: ""
};

export const profileReducer = (state = initialState, action) => {

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
        default:
            return state;
    }
}


export const deletePost = (id) => ({type: DELETE_POST, id})
export const addPostActionCreator = (value) => ({type: ADD_POST, value})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}


export default profileReducer;