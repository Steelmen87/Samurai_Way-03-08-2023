import React from 'react';
import Pagination from "../common/Pagination/Pagination";
import User from './User'

let Users = ({currentPage, totalUsersCount, pageSize, users, followingInProgress, unfollow, follow, onPageChanged}) => {

    return <div>
        <Pagination
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount}
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