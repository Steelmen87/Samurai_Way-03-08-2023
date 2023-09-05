export const requiredField = (value: string) => {
    if (value) return undefined
    return "Field is required"
}
export const requiredFieldLength = (len: number) => (value: string) => {
    if (value && value.length > len) return `Max ${len}`
    return undefined
}