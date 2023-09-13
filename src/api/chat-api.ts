let subscribers = [] as subscribesType[]


let ws: WebSocket | null;
const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

function createChannel() {
    ws && ws.removeEventListener('close', closeHandler)
    ws && ws.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws && ws.addEventListener('close', closeHandler)
    ws && ws.addEventListener('message', messageHandler)
}

const messageHandler = (e: MessageEvent) => {
    let parse = JSON.parse(e.data);
    subscribers.forEach(s => s(parse))
};

export const chatApi = {
    start() {
        createChannel()
    },
    stop(){
        ws && ws.removeEventListener('close', closeHandler)
        ws && ws.removeEventListener('message', messageHandler)
        ws && ws.close()
        subscribers = []
    },
    subscribe(callback: subscribesType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: subscribesType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessages(message: string) {
        ws && ws.send(message)
    }

}

type subscribesType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}