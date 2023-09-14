import React, {useEffect, useState, useRef} from 'react';
import {ChatMessageIpType, statusType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {chatMessageType, sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";


type propsType = {}
const ChatPage: React.FC<propsType> = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};
export default ChatPage;

const Chat: React.FC = () => {
    const status = useSelector<AppStateType, statusType>(state => state.chat.status)
    const dispatch = useDispatch();
    useEffect(() => {
        //@ts-ignore
        dispatch(startMessagesListening());
        return () => {
            //@ts-ignore
            dispatch(stopMessagesListening());
        }
    }, [])
    return (
        <div>
            {status === 'error' && <div>Some Error</div>}
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}
const Messages: React.FC<{}> = () => {
    const messagesAnchorRef = useRef<HTMLDivElement | null>(null)
    const messages = useSelector<AppStateType, chatMessageType[]>(state => state.chat.messages)
    const [isAutoScroll, setIsAutoScroll] = useState(false)
    useEffect(() => {
        if (isAutoScroll) {
            //@ts-ignore
            messagesAnchorRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    return (
        <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
type MessageType = {
    message: ChatMessageIpType
}
const Message: React.FC<MessageType> = React.memo(({message}) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>ME')
    return (
        <div>
            <img src={message.photo} style={{width: '30px'}} alt={'img'}/><b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})
const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('')
    const status = useSelector<AppStateType, statusType>(state => state.chat.status)
    const dispatch = useDispatch();
    const sendMessageHandler = () => {
        if (!message) return;
        //wsChannel && wsChannel.send(message)
        //@ts-ignore
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}/></div>
            <div>
                <button
                    disabled={status !== 'ready'} onClick={sendMessageHandler}>Send
                </button>
            </div>
        </div>
    )
}