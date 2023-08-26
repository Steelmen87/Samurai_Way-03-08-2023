import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../types/types";


export type propsType = MapPropsTypeProfile & DispatchPropsTypeProfile
export type MapPropsTypeProfile={
    isOwner: boolean
    profile: profileType
    status: string
}
export type DispatchPropsTypeProfile = {
    saveProfile: Function
    updateStatus: (status: string) => void
    savePhoto: Function
}
const Profile: React.FC<propsType> = (props) => {
    return (
        <div>
            <ProfileInfo
                saveProfile={props.saveProfile}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
            />

            <MyPostsContainer/>
        </div>
    )
}

export default Profile;