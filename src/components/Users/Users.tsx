import React, {useEffect} from 'react';
import Pagination from "../common/Pagination/Pagination";
import User from './User'
import {UserType} from "../../types/types";
import {UserFormikForm} from "./UsersSearchForm";
import {FilterType, requestUsers, unfollow, follow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {}
let Users: React.FC<PropsType> = (props) => {

    const followingInProgress = useSelector<AppStateType, Array<number>>(state => state.usersPage.followingInProgress)
    const users = useSelector<AppStateType, Array<UserType>>(state => state.usersPage.users)
    const totalUsersCount = useSelector<AppStateType, number>(state => state.usersPage.totalUsersCount)
    const currentPage = useSelector<AppStateType, number>(state => state.usersPage.currentPage)
    const pageSize = useSelector<AppStateType, number>(state => state.usersPage.pageSize)
    const filter = useSelector<AppStateType, FilterType>(state => state.usersPage.filter)

    const dispatch = useDispatch()
    const onPageChanged = (pageNumber: number) => {
        //@ts-ignore
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        //@ts-ignore
        dispatch(requestUsers(1, pageSize, filter))
    }
    const unfollowH = (userId: number) => {
        //@ts-ignore
        dispatch(unfollow(userId))
    }
    const followH = (userId: number) => {
        //@ts-ignore
        dispatch(follow(userId))
    }
    useEffect(() => {
        //@ts-ignore
        dispatch(requestUsers(1, pageSize, filter))
    }, [dispatch,filter,pageSize])
    return <div>
        <div>
            <UserFormikForm onFilterChanged={onFilterChanged}/>
        </div>
        <Pagination
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
        />
        {
            users.map(u => <User key={u.id}
                                 user={u}
                                 followingInProgress={followingInProgress}
                                 unfollow={unfollowH}
                                 follow={followH}/>)
        }
    </div>
}

export default Users;