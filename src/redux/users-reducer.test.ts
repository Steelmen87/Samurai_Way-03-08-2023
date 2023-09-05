import {UserType} from "../types/types";
import usersReducer, {followSuccess, initialStateType} from "./users-reducer";

let state: initialStateType;
beforeEach(() => {
    state = {
        users: [
            {
                name: 'Dimych 0', followed: false, id: 0, photos: {
                    large: null, small: null
                }, status: 'status 0'
            },
            {
                name: 'Dimych 1', followed: false, id: 1, photos: {
                    large: null, small: null
                }, status: 'status 1'
            },
            {
                name: 'Dimych 2', followed: true, id: 2, photos: {
                    large: null, small: null
                }, status: 'status 1'
            },
            {
                name: 'Dimych 3', followed: true, id: 3, photos: {
                    large: null, small: null
                }, status: 'status 3'
            }],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    };
})

test('user-reducer test 1', () => {
    const res = usersReducer(state, followSuccess(1))
    expect(res.users[1].followed).toBeTruthy()
    expect(res.users[2].followed).toBe(true)
})