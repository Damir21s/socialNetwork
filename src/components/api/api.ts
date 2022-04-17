import { photosType } from './../../types/types';
import axios from "axios";
import { profileType, usersType } from "../../types/types";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0`,
    withCredentials: true,
    headers: { "API-KEY": "74087132-646b-40f2-91ce-d925e5ec03c3" }
})
export enum ResultCodeEnum {
    Succses = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}
type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
type DataAuthMeResType = {
    id: number,
    email: string,
    login: string

}
type DataLoginType = {
    userId: number
}
type UsersResType = {
    items: Array<usersType>,
    totalCount: number,
    error: string | null
}
type SavePhotoResDataType ={
    photos: photosType
}
type getCaptchaUrlResType = {
    url: string
}
const usersApi = {
    async getUsers(pageNumber: number, pageSize: number) {
        return instance.get<UsersResType>(`/users?page=${pageNumber}&count=${pageSize}`).then(response => response.data)
    },
    async getUnFollow(userId: number) {
        return instance.delete<ResponseType>(`/follow/${userId}`).then(response => response.data)
    },
    async getFollow(userId: number) {
        return instance.post<ResponseType>(`/follow/${userId}`).then(response => response.data)
    },
    async getAuthMe() {
        return instance.get<ResponseType<DataAuthMeResType>>('/auth/me').then(response => response.data)
    },
    async login(email: string, password: string, captcha: string | null, rememberMe: boolean | null) {
        return instance.post<ResponseType<DataLoginType, ResultCodeEnum | ResultCodeForCaptchaEnum>>('auth/login', { email, password, captcha, rememberMe }).then(response => response.data)
    },
    async logout() {
        return instance.delete<ResponseType<DataLoginType>>('auth/login').then(response => response.data)
    },
    async getUserProfile(userId: number) {
        return instance.get<profileType>(`/profile/${userId}`).then(response => response.data)
    },
    async getUserStatus(userId: number) {
        return instance.get(`/profile/status/${userId}`).then(response => response.data)
    },
    async getUpdateStatus(status: string) {
        return instance.put<ResponseType>(`/profile/status`, { status: status }).then(response => response.data)
    },
    async savePhoto(filePhoto: string) {
        let formData = new FormData();
        formData.append("image", filePhoto)
        return instance.put<ResponseType<SavePhotoResDataType>>(`/profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => response.data)
    },
    async saveProfile(profile: profileType) {
        return instance.put<ResponseType>(`/profile`, profile).then(response => response.data)
    },
    async getCaptchaUrl() {
        return instance.get<getCaptchaUrlResType>('/security/get-captcha-url').then(response => response.data)
    }

}
export default usersApi;