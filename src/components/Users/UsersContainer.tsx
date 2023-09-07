import React from 'react';
import {connect} from 'react-redux';
import {
    FilterType,
    follow,
    requestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter
} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux-store";


type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    followingInProgress: Array<number>
    isFetching: boolean

    filter: FilterType

}
type MapDispatchToPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType, any> {
    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users/>
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers: requestUsers
    })
)(UsersContainer)