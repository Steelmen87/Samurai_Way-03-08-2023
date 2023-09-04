import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "4e5aee81-42dd-43de-87fa-a601a9c1e88b"
    }
});

/*
type GetProfileType = {
    aboutMe: null | string
    contacts: {
        facebook: null | string
        website: null | string
        vk: null | string
        twitter: null | string
        instagram: null | string
        youtube: null | string
        github: null | string
        mainLink: null | string
    },
    lookingForAJob: true,
    lookingForAJobDescription: null | string
    fullName: null | string
    userId: number,
    photos: {
        small: null | string
        large: null | string
    }
}*/

export type ResponseType<D = {}> = {
    data: D
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}

export type UserType = {
    name: null | string
    id: number
    uniqueUrlName: null | string
    photos: {
        small: null | string
        large: null | string
    },
    status: null | string
    followed: boolean
}
export type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10

}

