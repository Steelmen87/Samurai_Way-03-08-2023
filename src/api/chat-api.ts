let subscribers = {
    'messages-received': [] as MessagesReceivedSubscribesType[],
    'status-changed': [] as StatusChangedSubscribesType[]
}


let ws: WebSocket | null;
const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
const clearUp = () => {
    ws && ws.removeEventListener('close', closeHandler)
    ws && ws.removeEventListener('message', messageHandler)
    ws && ws.removeEventListener('error', errorHandler)
    ws && ws.removeEventListener('open', openHandler)
}
const notifySubscribersAboutStatus = (status: statusType) => {
    subscribers["status-changed"].forEach((s) => s(status));
}

function createChannel() {
    clearUp()
    ws && ws.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending')
    ws && ws.addEventListener('close', closeHandler)
    ws && ws.addEventListener('message', messageHandler)
    ws && ws.addEventListener('open', openHandler)
    ws && ws.addEventListener('error', errorHandler)
}

const errorHandler = () => {
    notifySubscribersAboutStatus("error")
    console.error("Refresh Page")
};
const openHandler = () => {
    notifySubscribersAboutStatus("ready")
};
const messageHandler = (e: MessageEvent) => {
    let parse = JSON.parse(e.data);
    subscribers['messages-received'].forEach(s => s(parse))
};

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        ws && ws.close()
        clearUp();
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
    },
    subscribe(event: EventsNames, callback: MessagesReceivedSubscribesType | StatusChangedSubscribesType) {
        //@ts-ignore
        subscribers[event].push(callback)
        return () => {
            //@ts-ignore
            subscribers[event] = subscribers[event].filter(s => s !== callback)
        }
    },
    unsubscribe(event: EventsNames, callback: MessagesReceivedSubscribesType | StatusChangedSubscribesType) {
        //@ts-ignore
        subscribers[event] = subscribers[event].filter(s => s !== callback)
    },
    sendMessages(message: string) {
        ws && ws.send(message)
    }

}

type MessagesReceivedSubscribesType = (messages: ChatMessageIpType[]) => void
type StatusChangedSubscribesType = (status: statusType) => void
export type statusType = 'pending' | 'ready' | 'error';
export type EventsNames = 'messages-received' | 'status-changed'
export type ChatMessageIpType = {
    message: string
    photo: string
    userId: number
    userName: string
}