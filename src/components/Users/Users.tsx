import React, {useEffect} from 'react';
import Pagination from "../common/Pagination/Pagination";
import User from './User'
import {UserType} from "../../types/types";
import {UserFormikForm} from "./UsersSearchForm";
import {FilterType, requestUsers, unfollow, follow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {useHistory} from 'react-router-dom';
import * as queryString from "querystring";

type QueryParamsType = { term?: string; page?: string; friend?: string }
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
        history.push({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${pageNumber}`
        })
        //@ts-ignore
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        history.push({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${actualFilter}`
        })
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
    const history = useHistory();

    let actualPage = currentPage
    let actualFilter = filter
    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1))

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {
            ...actualFilter,
            friend: parsed.friend === 'null' ? null : parsed.friend === 'true'
        }
        //@ts-ignore
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])
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