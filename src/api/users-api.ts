import {GetUsersType, instance} from "./api";
import {profileAPI} from "./profile-api";
import {ResponseType} from './api';

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)/*.then(res => res.data)*/
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data)/*.then(res => res.data) as Promise<ResponseType>*/
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId);
    }
}
