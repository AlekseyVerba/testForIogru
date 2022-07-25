export const valuesFromObjectToArr = (obj: Record<string, any>): any[] => {
    const propertyArr: any[] = []
    for(let i in obj) {
        propertyArr.push(obj[i])
    }

    return propertyArr

}