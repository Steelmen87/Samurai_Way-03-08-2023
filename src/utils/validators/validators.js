export const requiredField = value =>{
    if(value) return undefined
    return "Field is required"
}
export const requiredFieldLength =(len)=> value =>{
    if(value && value.length > len) return "Max "  `${len}`
    return undefined
}