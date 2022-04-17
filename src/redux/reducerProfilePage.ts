import { ThunkAction } from 'redux-thunk';
import { string } from 'yup';
import usersApi from "../components/api/api";
import { photosType, postsDataType, profileType } from '../types/types';
import { AppReducerType, InferActionsTypes } from './redux-store';

export type initialStateType = typeof initialState
let initialState = {
    postsData: [
        { id: 1, messeges: "hi, its my first post", likescount: 2 },
        { id: 2, messeges: "Today smile", likescount: 3 }
    ] as Array<postsDataType>,
    profile: null as profileType | null,
    newPostText: "",
    status: "",
    error: null
}

const profilePageReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost = {
                id: 3,
                messeges: state.newPostText,
                likescount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ""
            };
        case 'UPDATE-NEW-POST-TEXT':
            return {
                ...state,
                newPostText: action.NewText,
            };
        case 'SET-USER-PROFILE':
            return {
                ...state,
                profile: action.profile
            };
        case 'SET-STATUS':
            return {
                ...state,
                status: action.status
            };
        case 'SAVE-PHOTO-SUCCSESS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photo } as profileType
            };
        case 'ERROR-SAVE-PROFILE':
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>
export const actions = {
     addPostActionCreator:  ()=> ({ type: 'ADD-POST' }) as const,
     updateNewPostActionCreator: (text: string) => ({ type: 'UPDATE-NEW-POST-TEXT', NewText: text }) as const,
     setUserProfile: (profile: profileType) => ({ type: 'SET-USER-PROFILE', profile }) as const,
     setStatus: (status: string) => ({ type: 'SET-STATUS', status }) as const,
     savePhotoSuccsess: (photo: photosType) => ({ type: 'SAVE-PHOTO-SUCCSESS', photo }) as const,
     errorSaveProfile: (error: any) => ({ type: 'ERROR-SAVE-PROFILE', error }) as const
}
type ThunkType = ThunkAction<void, AppReducerType, unknown, ActionsType>
export let getUsersProfile = (match: any): ThunkType =>
 async (dispatch) => {
    let userId = match ? match.params.userId : '22386';
    let data = await usersApi.getUserProfile(userId)
    dispatch(actions.setUserProfile(data))
}
export let getStatus = (match: any): ThunkType =>
 async (dispatch) => {
    let userId = match ? match.params.userId : '22386';
    let data = await usersApi.getUserStatus(userId)
    dispatch(actions.setStatus(data))
}
export let getUpdateStatus = (status: string): ThunkType =>
 async (dispatch) => {
    let data = await usersApi.getUpdateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export let savePhoto = (file: string): ThunkType =>
 async (dispatch) => {
    let data = await usersApi.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccsess(data.data.photos))
    }
}
export let saveProfile = (profile: profileType): ThunkType =>
 async (dispatch, getState) => {
    let userId = getState().auth.id;
    let data = await usersApi.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getUsersProfile(userId))
    }
    else {
        dispatch(actions.errorSaveProfile(data.messages))
    }
}
export default profilePageReducer;