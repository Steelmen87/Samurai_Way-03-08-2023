import {instance} from "./api";

export type ResponseCaptchaType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<ResponseCaptchaType>(`security/get-captcha-url`).then(res => res.data)
    }
}