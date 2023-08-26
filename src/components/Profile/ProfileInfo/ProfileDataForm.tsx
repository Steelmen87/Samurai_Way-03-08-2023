import React, {FormEvent} from 'react';
import {InjectedFormProps, Field, reduxForm} from "redux-form";
import TextArea, {Input} from "../../common/FormsControls/FormsControls";
import s from './ProfileInfo.module.css'
import style from '../../common/FormsControls/FormsControls.module.css'
import {profileType} from "../../../types/types";

export interface IFormProps {
    initialValues: profileType
    profile: profileType
    error: string
}

export interface IDispatchProps {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

/*type propsType = {
    profile: profileType
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
    error: string
}*/
const ProfileDataForm: React.FC<any> = (props) => {
    const {profile, error, handleSubmit} = props
    return <form onSubmit={handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        {error && <div className={style.errorSummary}>{error}</div>}
        <div><b>Full name:</b>
            <Field
                validate={[]}
                component={Input}
                name={"fullName"}
                placeholder={"Full name"}/></div>


        <b>Looking for a job:</b> <Field
        validate={[]}
        component={Input}
        type="checkbox"
        name={"lookingForAJob"}
    />
        <div><b>My professional skills:</b>
            <div><Field
                validate={[]}
                component={TextArea}
                name={"lookingForAJobDescription"}
                placeholder={"My professional skills"}/>
            </div>
        </div>

        <div><b>About Me:</b>
            <Field
                validate={[]}
                component={Input}
                name={"aboutMe"}
                placeholder={"about Me"}/>
        </div>
        <div>
            <b>Contacts:</b>{Object.keys(profile.contacts).map((el) => {
            return <div className={s.contact} key={el}>
                <b>{el}:</b>
                <Field
                    validate={[]}
                    component={Input}
                    name={'contacts.' + el}
                    placeholder={el}/>
            </div>
        })}
        </div>
    </form>
}


const ProfileReduxForm = reduxForm<IFormProps, IDispatchProps>({form: 'profile-data'})(ProfileDataForm)

export default ProfileReduxForm;