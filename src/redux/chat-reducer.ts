import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {chatApi, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as ChatMessageType[]
};
export type initialStateType = typeof initialState
const chatReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGE_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }
        default:
            return state;
    }
}

export const messagesReceived = (messages: ChatMessageType[]) => ({
    type: 'SN/CHAT/MESSAGE_RECEIVED',
    payload: messages
} as const)

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
let newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        };
    }
    return _newMessageHandler
}
export const startMessagesListening = (): ThunkActionType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkActionType => async (dispatch) => {
    chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
    chatApi.stop()
}
export const sendMessage = (message: string): ThunkActionType => async (dispatch) => {
    chatApi.sendMessages(message)
}


export default chatReducer;

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
type ActionType = messagesReceivedActionType
export type messagesReceivedActionType = ReturnType<typeof messagesReceived>