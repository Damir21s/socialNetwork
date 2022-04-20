import { dialogsDataType, messagesData } from "../types/types"
import { InferActionsTypes } from "./redux-store"

export type initialStateType = typeof initialState
let initialState = {
    DialogsData: [
        { id: 1, name: "Petr" },
        { id: 2, name: "Alex" },
        { id: 3, name: "Dima" },
        { id: 4, name: "Karina" },
    ] as Array<dialogsDataType>,
    MessagesData: [
        { id: 1, messages: "Hello" },
        { id: 2, messages: "Yo" },
        { id: 3, messages: "World" },
    ] as Array<messagesData>,
    newMessageText: '' as string
}

const messagesPageReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            let newMessage = {
                id: 4,
                messages: state.newMessageText
            }
            return {
                ...state,
                MessagesData: [...state.MessagesData, newMessage],
                newMessageText: ""
            };
        case 'UPDATE-NEW-MESSAGE-TEXT':
            return {
                ...state,
                newMessageText: action.NewText
            };

        default:
            return state;
    }
}
type ActionsType = InferActionsTypes<typeof actions>
export const actions = {
    addMessageActionCreator: () => ({ type: 'ADD-MESSAGE' }) as const,
    updateNewMessageActionCreator: (text: string) =>
        ({ type: 'UPDATE-NEW-MESSAGE-TEXT', NewText: text }) as const
}
export default messagesPageReducer;