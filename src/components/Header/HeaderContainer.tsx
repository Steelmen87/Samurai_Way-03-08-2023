import React from 'react';
import Header, {DispatchPropsType, MapPropsType} from "./Header";
import {connect} from "react-redux";
import {logOut} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType,any> {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});
//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>
(mapStateToProps, {logOut})(HeaderContainer);