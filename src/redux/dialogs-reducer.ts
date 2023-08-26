const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id: Number
    message: string
}


let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ]as Array<MessagesType>
};
type initialStateType = typeof initialState
const dialogsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.value}]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (value: string) => ({type: SEND_MESSAGE, value})

export default dialogsReducer;

type ActionType = ReturnType<typeof sendMessageCreator>