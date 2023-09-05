import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component: React.ComponentType) => {
    function RedirectComponent(props:any) {
        if (!props.isAuth) return <Redirect to='/login'/>
        return <Component {...props}/>
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent;

}