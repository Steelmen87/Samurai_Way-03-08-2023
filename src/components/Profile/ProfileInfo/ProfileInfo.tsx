import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from './../../../assets/images/user.png'
import ProfileReduxForm from "./ProfileDataForm";
import {propsType} from './../Profile';
import {profileType} from "../../../types/types";


const ProfileInfo: React.FC<propsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<any>) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const callBack = () => {
        setEditMode(true)
    }
    const onSubmit = (e: any) => {
        saveProfile(e).then(() => setEditMode(false))
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt={'img'}/>
                {editMode
                    //@ts-ignore
                    ? <ProfileReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} callBack={callBack}/>}
                <div>{isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}</div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;

type ProfileDataPropsType = {
    profile: profileType
    isOwner: boolean
    callBack: () => void
}

export const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, callBack}) => {
    debugger
    return <div>
        {isOwner && <div>
            <button onClick={callBack}>edit</button>
        </div>}
        <div><b>Full name:</b> {profile.fullName}</div>
        <div><b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : 'no'}</div>
        {profile.lookingForAJob &&
        <div><b>My professional skills:</b> {profile.lookingForAJobDescription}</div>}
        <div><b>About Me:</b> {profile.aboutMe}</div>

        <div>
            <b>Contacts:</b>{Object.keys(profile.contacts).map((el, index) => {
            return <div className={s.contact} key={index}><Contacts
                contactTitle={el}
                //@ts-ignore
                contactValue={profile.contacts[el]}
            /></div>
        })}
        </div>

    </div>
}
type propsTypeContacts = {
    contactTitle:string
    contactValue:string
}
const Contacts = ({contactTitle, contactValue}:propsTypeContacts) => {
    return (
        <div>
            <div><b>{contactTitle}:</b> {contactValue}</div>
        </div>
    )
}