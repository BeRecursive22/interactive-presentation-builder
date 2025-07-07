


export const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key) || null
}

export const getSessionId = () => {
    const sessionId = getLocalStorage("sessionId")
    if(!sessionId) {
        return null
    }
    return JSON.parse(sessionId)
}