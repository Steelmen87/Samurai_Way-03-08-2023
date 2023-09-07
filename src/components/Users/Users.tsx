import React from 'react';
import Pagination from "../common/Pagination/Pagination";
import User from './User'
import {UserType} from "../../types/types";
import {UserFormikForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (p: number) => void
    onFilterChanged:(filter: FilterType)=>void
}
let Users: React.FC<PropsType> = (props) => {
    const {
        currentPage,
        totalUsersCount,
        pageSize,
        users,
        followingInProgress,
        unfollow,
        follow,
        onPageChanged
    } = props;
    return <div>
        <div>
            <UserFormikForm onFilterChanged={props.onFilterChanged}/>
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
                                 unfollow={unfollow}
                                 follow={follow}/>)
        }
    </div>
}

export default Users;