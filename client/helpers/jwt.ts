export const setWithExpiry = (key: string, value: any, exp: number): void => {
    const now = new Date()
    const item = {
        value: value,
        expiry: now.getTime() + exp,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

export const getWithExpiry = (key: string): any => {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null

    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return null
    }
    return item.value
}






