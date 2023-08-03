import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {reduxForm} from "redux-form";
import {Field} from "redux-form";
import TextArea from "../common/FormsControls/FormsControls";
import {requiredField, requiredFieldLength} from "../../utils/validators/validators";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);
    let addNewMessage = (value) => {
        props.sendMessage(value.textarea)
    }
    if (!props.isAuth) return <Redirect to={"/login"}/>;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;

const letVal = requiredFieldLength(30)
const AddMessageForm = (props) => {
    return <>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={"textarea"}
                    component={TextArea}
                    placeholder='Enter your message'
                    validate={[requiredField, letVal]}
                >
                </Field>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    </>
}
const AddMessageFormRedux = reduxForm({
    form: 'dialogAddMessage'
})(AddMessageForm)

























