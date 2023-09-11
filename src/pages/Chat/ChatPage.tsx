import React, {useEffect, useState} from 'react';


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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    useEffect(() => {
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
    }, [])
    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}
const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        let messageHandler = (e:MessageEvent) => {
            let parse = JSON.parse(e.data);
            setMessages(prevState => [...prevState, ...parse])
        };
        wsChannel && wsChannel.addEventListener('message', messageHandler)
        return () => {
            wsChannel && wsChannel.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])
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
const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [text, setText] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    useEffect(() => {
        let openHandler = () => {
            setReadyStatus("ready")
        };
        wsChannel && wsChannel.addEventListener('open', openHandler)
        return () => {
            wsChannel && wsChannel.removeEventListener('open', openHandler)
        }
    }, [wsChannel])
    const sendMessage = () => {
        if (!text) return;
        wsChannel && wsChannel.send(text)
        setText('')
    }
    return (
        <div>
            <div>
                <textarea onChange={e => setText(e.currentTarget.value)} value={text}/></div>
            <div>
                <button
                    disabled={wsChannel == null || readyStatus !== 'ready'} onClick={sendMessage}>Send
                </button>
            </div>
        </div>
    )
}