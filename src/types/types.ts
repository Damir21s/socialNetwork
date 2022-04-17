export type postsDataType = {
    id: number,
    messeges: string,
    likescount: number
}
export type contactsType = {
    github: string | null,
    vk: string | null,
    facebook: string | null,
    instagram: string | null,
    twitter: string | null,
    website: string | null,
    youtube: string | null,
    mainLink: string | null,
}
export type photosType = {
    small: string 
    large: string
}
export type profileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: contactsType,
    photos: photosType
}
export type usersType = {
    id: number,
    name: string,
    status: string,
    photos: photosType,
    followed: boolean
}