export const updateObjectInArray = (items:any, itemId:any, objPropName:any, newObjectProps:any) => {
    return items.map((u:any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjectProps}
        }
        return u
    })
}