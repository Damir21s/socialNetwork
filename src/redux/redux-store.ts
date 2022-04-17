import { applyMiddleware, combineReducers, createStore } from 'redux'
import AuthReducer from './reducerAuth'
import messagesPageReducer from './reducerMessagesPage'
import profilePageReducer from './reducerProfilePage'
import UsersReducer from './reducerUsers'
import thunkMiddleware from 'redux-thunk'

const redusers = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
    usersPage: UsersReducer,
    auth: AuthReducer
})
let store = createStore(redusers, applyMiddleware(thunkMiddleware));
type reducersType = typeof redusers
export type AppReducerType = ReturnType<reducersType>
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
// @ts-ignore
window.store = store

export default store