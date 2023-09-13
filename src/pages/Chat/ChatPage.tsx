import React, {MouseEventHandler, useEffect, useState} from 'react';
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
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
    // const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    /*useEffect(() => {
        let ws: WebSocket;
        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws && ws.removeEventListener('close', closeHandler)
            ws && ws.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws && ws.addEventListener('close', closeHandler)

            setWsChannel(ws)
        }

        createChannel();
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])*/
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
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}
const Messages: React.FC<{}> = () => {
    const messages = useSelector<AppStateType, ChatMessageType[]>(state => state.chat.messages)
    /*useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let parse = JSON.parse(e.data);
            setMessages(prevState => [...prevState, ...parse])
        };
        wsChannel && wsChannel.addEventListener('message', messageHandler)
        return () => {
            wsChannel && wsChannel.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])*/
    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m) => <Message key={m.userId} message={m}/>)}
        </div>
    )
}
type MessageType = {
    message: ChatMessageType
}
const Message: React.FC<MessageType> = ({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: '30px'}} alt={'img'}/><b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}
const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    /* useEffect(() => {
         let openHandler = () => {
             setReadyStatus("ready")
         };
         wsChannel && wsChannel.addEventListener('open', openHandler)
         return () => {
             wsChannel && wsChannel.removeEventListener('open', openHandler)
         }
     }, [wsChannel])*/
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
                    disabled={false} onClick={sendMessageHandler}>Send
                </button>
            </div>
        </div>
    )
}