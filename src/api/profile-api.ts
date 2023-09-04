import {photosType, profileType} from "../types/types";
import {instance, ResponseType} from "./api";
import {ResponseAuthType} from "./auth-api";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<profileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put<ResponseAuthType>(`profile/status`, {status: status}).then(res => res.data);
    },
    saveProfile(profile: profileType) {
        return instance.put<ResponseType>(`profile`, profile).then(res => res.data);
    },
    savePhoto(photoFile: File) {
        let formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<ResponseType<{ photos: photosType }>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}