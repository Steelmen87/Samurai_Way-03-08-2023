import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {profileType} from "../../types/types";
import {RouteComponentProps} from 'react-router';

type mapStateToPropsType = {
    profile: profileType | null
    status: string
    autorizedUserId: number | null
    isAuth: boolean
}
type mapDispatchToProps = {
    getUserProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (proto: File) => void
    saveProfile: (profile: profileType) => Promise<any>
}
type PathParamsProps = {
    userId: string
}

class ProfileContainer extends React.Component<mapStateToPropsType & mapDispatchToProps & RouteComponentProps<PathParamsProps>, any> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorizedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: mapStateToPropsType & mapDispatchToProps & RouteComponentProps<PathParamsProps>,
                       prevState: AppStateType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {
        return (
            <Profile
                {...this.props}
                //@ts-ignore
                profile={this.props.profile}
                status={this.props.status}
                //@ts-ignore
                isOwner={!this.props.match.params.userId}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);




