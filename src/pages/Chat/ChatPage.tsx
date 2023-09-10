import React, {useEffect, useState} from 'react';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
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

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}
const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        ws.addEventListener('message', (e) => {
            let parse = JSON.parse(e.data);
            setMessages(prevState => [...prevState, ...parse])
        })
    }, [])
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
const AddMessageForm: React.FC = () => {
    const [text, setText] = useState('')
    const sendMessage = () => {
        if (!text) return;
        ws.send(text)
        setText('')
    }
    return (
        <div>
            <div>
                <textarea onChange={e => setText(e.currentTarget.value)} value={text}/></div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}