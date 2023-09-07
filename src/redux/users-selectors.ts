import {createSelector} from 'reselect'
import {AppStateType} from "./redux-store";
import {UserType} from "../types/types";

export const getUsers = (state:AppStateType) => {
    return state.usersPage.users;
}


export const getUsersSelectorS = createSelector(getUsers, (users:Array<UserType>)=> {
    return users.filter(u => true);
})


export const getPageSize = (state:AppStateType) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state:AppStateType) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state:AppStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state:AppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state:AppStateType) => {
    return state.usersPage.followingInProgress;
}
export const getUsersFilter = (state:AppStateType) => {
    return state.usersPage.filter;
}