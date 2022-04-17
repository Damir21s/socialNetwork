import { ThunkAction } from 'redux-thunk';
import usersApi, { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../components/api/api";
import { AppReducerType, InferActionsTypes } from './redux-store';

export type initialStateType = typeof initialState
let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: null as boolean | null,
    captchaUrl: null as string | null
}

const AuthReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SET_DATA_AUTH':
        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload as setAuthUserDataPayloadType,
            }
        default:
            return state;
    }
}
type ActionsType = InferActionsTypes<typeof actions>
type setAuthUserDataPayloadType = {
    id?: number | null,
    login?: string | null,
    email?: string | null,
    isAuth?: boolean
}
export const actions = {
    setAuthUserData: (
        id?: number | null, login?: string | null,
        email?: string | null, isAuth?: boolean) =>
        ({ type: 'SET_DATA_AUTH', payload: { id, login, email, isAuth } }) as const,
    setCaptchaUrl: (captchaUrl: string) =>
        ({ type: 'SET_CAPTCHA_URL', payload: { captchaUrl } }) as const
}
type ThunkType = ThunkAction<void, AppReducerType, unknown, ActionsType>
export let getAuth = (): ThunkType => async (dispatch) => {
    let data = await usersApi.getAuthMe()
    if (data.resultCode === ResultCodeEnum.Succses) {
        let { id, login, email } = data.data;
        dispatch(actions.setAuthUserData(id, login, email, true));
    }
}
export let login = (
    email: string, password: string, captcha: string | null,
    rememberMe: boolean | null, setStatus: any): ThunkType =>
    async (dispatch) => {
        let data = await usersApi.login(email, password, captcha, rememberMe)
        if (data.resultCode === ResultCodeEnum.Succses) {
            dispatch(actions.setAuthUserData());
        } else {
            if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            setStatus({ error: data.messages })
        }
    }
export let getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await usersApi.getCaptchaUrl();
    let captchaUrl = data.url;
    dispatch(actions.setCaptchaUrl(captchaUrl))
}
export let logout = (): ThunkType => async (dispatch) => {
    let data = await usersApi.logout()
    if (data.resultCode === ResultCodeEnum.Succses) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}
export default AuthReducer;