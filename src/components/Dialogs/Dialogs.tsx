import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import TextArea from "../common/FormsControls/FormsControls";
import {requiredField, requiredFieldLength} from "../../utils/validators/validators";
import {initialStateType} from "../../redux/dialogs-reducer";


type PropsType = {
    dialogsPage: initialStateType
    sendMessage: (textarea: string) => void
}
const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    //@ts-ignore
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);
    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.textarea)
    }

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
type PropsAddType = {}
export type NewMessageFormValuesType = {
    textarea: string
}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsAddType> & PropsAddType> = (props) => {
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
const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({
    form: 'dialogAddMessage'
})(AddMessageForm)

























