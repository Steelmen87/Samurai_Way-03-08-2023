import axios from "axios";
import {photosType, profileType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "4e5aee81-42dd-43de-87fa-a601a9c1e88b"
    }
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<profileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put<ResponseAuthType>(`profile/status`, {status: status});
    },
    saveProfile(profile: profileType) {
        return instance.put<ResponseType>(`profile`, profile);
    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<ResponseType<{ photos: photosType }>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

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
}

type ResponseType<D = {}> = {
    data: D
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}

type UserType = {
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
type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}


type dataAuthType = {
    id: number,
    email: string
    login: string
}
type ResponseAuthType<D = {}> = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: D
}

export const authAPI = {
    me() {
        return instance.get<ResponseAuthType<dataAuthType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<ResponseAuthType<{ userId: number }>>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

type ResponseCaptchaType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<ResponseCaptchaType>(`security/get-captcha-url`)
    }
}


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10

}

