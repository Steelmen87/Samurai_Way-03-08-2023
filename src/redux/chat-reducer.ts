import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {chatApi, ChatMessageIpType, statusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from "uuid";

export type chatMessageType = ChatMessageIpType & { id: string };

let initialState = {
    messages: [] as chatMessageType[],
    status: 'pending' as statusType
};
export type initialStateType = typeof initialState
const chatReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGE_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.map((m) => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case 'SN/CHAT/SET_STATUS':
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
}

export const messagesReceived = (messages: ChatMessageIpType[]) => ({
    type: 'SN/CHAT/MESSAGE_RECEIVED',
    payload: messages
} as const)
export const setStatus = (status: statusType) => ({
    type: 'SN/CHAT/SET_STATUS',
    payload: status
} as const)

let _newMessageHandler: ((messages: ChatMessageIpType[]) => void) | null = null;
let newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        };
    }
    return _newMessageHandler
}
let _StatusChangedHandler: ((status: statusType) => void) | null = null;
let newStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_StatusChangedHandler === null) {
        _StatusChangedHandler = (status) => {
            dispatch(setStatus(status))
        };
    }
    return _StatusChangedHandler
}
export const startMessagesListening = (): ThunkActionType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe("status-changed", newStatusHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkActionType => async (dispatch) => {
    chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe("status-changed", newStatusHandlerCreator(dispatch))
    chatApi.stop()
}
export const sendMessage = (message: string): ThunkActionType => async (dispatch) => {
    chatApi.sendMessages(message)
}


export default chatReducer;

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
type ActionType = messagesReceivedActionType | setStatusActionType

export type messagesReceivedActionType = ReturnType<typeof messagesReceived>
export type setStatusActionType = ReturnType<typeof setStatus>