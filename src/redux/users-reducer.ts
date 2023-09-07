import {updateObjectInArray} from "../utils/object-helper";
import {UserType} from "../types/types";
import {Dispatch} from "react";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/users-api";
import {ResponseType} from './../api/api'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    filter: {term: '', friend: null as null | boolean}
};
export type initialStateType = typeof initialState
export type FilterType = typeof initialState.filter
const usersReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        case "SET_FILTER": {
            return {
                ...state,
                filter: action.payload
            }
        }
        default:
            return state;
    }
}


export const followSuccess = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unfollowSuccess = (userId: number) => ({type: 'UNFOLLOW', userId} as const)
export const setUsers = (users: Array<UserType>) => ({type: 'SET_USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const)
export const setFilter = (filter:FilterType) => ({
    type: 'SET_FILTER',
    payload: filter
} as const)
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: 'SET_TOTAL_USERS_COUNT',
    count: totalUsersCount
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId
} as const)


export const requestUsers = (currentPage: number, pageSize: number, filter:FilterType): ThunkType =>
    async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize, filter.term,filter.friend)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setFilter(filter));
        dispatch(setCurrentPage(currentPage));
        //@ts-ignore
        dispatch(setTotalUsersCount(data.totalCount));
    }
const followUnfollowFlow = async (dispatch: Dispatch<ActionType>, userId: number, apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: (userId: number) => followSuccessType | unfollowSuccessType) => {
    dispatch(toggleFollowingProgress(true, userId));
    const response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}
export const follow = (userId: number) =>
    async (dispatch: any) => {
//@ts-ignore
        let apiMethod = usersAPI.follow.bind(usersAPI)
        let actionCreator = followSuccess;

        await followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
export const unfollow = (userId: number) => async (dispatch: any) => {
    //@ts-ignore
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
}

export default usersReducer;
export type followSuccessType = ReturnType<typeof followSuccess>
export type unfollowSuccessType = ReturnType<typeof unfollowSuccess>
export type setUsersType = ReturnType<typeof setUsers>
export type setCurrentPageType = ReturnType<typeof setCurrentPage>
export type setTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
export type toggleIsFetchingType = ReturnType<typeof toggleIsFetching>
export type toggleFollowingProgressType = ReturnType<typeof toggleFollowingProgress>
export type setFilterType = ReturnType<typeof setFilter>

type ActionType =
    setFilterType
    | followSuccessType
    | unfollowSuccessType
    | setUsersType
    | setCurrentPageType
    | setTotalUsersCountType
    | toggleIsFetchingType
    | toggleFollowingProgressType