import { ThunkAction } from "redux-thunk"
import usersApi from "../components/api/api"
import { usersType } from "../types/types"
import { AppReducerType, InferActionsTypes } from "./redux-store"

export type initialStateType = typeof initialState
let initialState = {
    users: [] as Array<usersType>,
    totalCountUsers: 0,
    pageSize: 5,
    currentPage: 1,
    isFollowingProcces: [] as Array<number>,
    isFetching: true
}

const UsersReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                //users: [...state.users] {ниже то же самое}
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_COUNT_USERS':
            return {
                ...state,
                totalCountUsers: action.totalCount
            }
        case 'CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.numberPage
            }
        case 'IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'IS_FOLLOWING_PROCCES':
            return {
                ...state,
                isFollowingProcces: action.isFetching ?
                    [...state.isFollowingProcces, action.userId] : state.isFollowingProcces.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}
type ActionsType = InferActionsTypes<typeof actions>
export const actions = {
    followAccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowAccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<usersType>) => ({ type: 'SET_USERS', users } as const),
    settotalCountUsers: (totalCount: number) => ({ type: 'SET_COUNT_USERS', totalCount } as const),
    setcurrentPage: (numberPage: number) => ({ type: 'CURRENT_PAGE', numberPage } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'IS_FETCHING', isFetching } as const),
    followingProcces: (isFetching: boolean, userId: number) => ({ type: 'IS_FOLLOWING_PROCCES', isFetching, userId } as const)
}

type ThunkType = ThunkAction<void, AppReducerType, unknown, ActionsType>
export let getUsers = (currentPage: number, pageSize: number): ThunkType =>
    async (dispatch) => {
        dispatch(actions.setcurrentPage(currentPage))
        dispatch(actions.toggleIsFetching(true))
        let data = await usersApi.getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.settotalCountUsers(data.totalCount))
    }
export let follow = (userId: number): ThunkType =>
    async (dispatch) => {
        dispatch(actions.followingProcces(true, userId))
        let data = await usersApi.getFollow(userId)
        if (data.resultCode === 0) {
            dispatch(actions.followAccess(userId))
        }
        dispatch(actions.followingProcces(false, userId))
    }

export let unfollow = (userId: number): ThunkType =>
    async (dispatch: any) => {
        dispatch(actions.followingProcces(true, userId))
        let data = await usersApi.getUnFollow(userId)
        if (data.resultCode === 0) {
            dispatch(actions.unfollowAccess(userId))
        }
        dispatch(actions.followingProcces(false, userId))
    }

export default UsersReducer;