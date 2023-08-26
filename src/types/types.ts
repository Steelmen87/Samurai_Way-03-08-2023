export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
    small: string | null
    large: string | null
}
export type profileType = {
    aboutMe:string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
}
export type postType = { id: number, message: string, likesCount: number }
export type UserType = {
    name: string | null
    id: number
    photos: photosType
    status: null | string
    followed: boolean
}