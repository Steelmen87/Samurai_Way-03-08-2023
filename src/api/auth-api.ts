import {instance, ResultCodesEnum} from "./api";

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
export type dataAuthType = {
    id: number,
    email: string
    login: string
}
export type ResponseAuthType<D = {}> = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: D
}