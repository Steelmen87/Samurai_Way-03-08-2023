import {useSelector} from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";
import React from "react";
import {AppStateType} from "../../redux/redux-store";

export const PageUsers = () => {
    const isFetching = useSelector<AppStateType, boolean>(state => state.usersPage.isFetching)
    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}