export type contactsType = {
    github: string| null
    vk: string| null
    facebook: string| null
    instagram: string| null
    twitter: string| null
    website: string| null
    youtube: string| null
    mainLink: string| null
}
export type photosType = {
    small: string | null
    large: string | null
}
export type profileType = {
    aboutMe:string| null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string| null
    fullName: string| null
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