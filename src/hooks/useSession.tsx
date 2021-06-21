import { sha256 } from "js-sha256"
import { useState } from "react"
import USER_API from "../api/users"

export default function useSession() {
    const ID_KEY = 'id'
    const USER_KEY = "user"
    
    const getSession = (): ISession => {
        const id = sessionStorage.getItem(ID_KEY)
        const username = sessionStorage.getItem(USER_KEY)
        if(id && username) return { 
            id: id,
            username: username,
            password: undefined
        }
        saveSession(undefined)
        return undefined
    }

    const saveSession = async (session: ISession | undefined): Promise<void> => {
        var logged: ISession

        if(!session || !session.username || !session.password) {
            clearCache()
            return Promise.reject()
        }
        
        session.password = sha256(session.password)
        logged = await USER_API.login(session)

        if(!logged || !logged.id || !logged.username) {
            clearCache()
            return Promise.reject()
        }
        
        setCache(logged.id, logged.username)
        setSession(logged)
        return Promise.resolve()
    }

    const [currSession, setSession] = useState<ISession>(undefined)

    const clearCache = (): void => {
        sessionStorage.removeItem(ID_KEY)
        sessionStorage.removeItem(ID_KEY)
    }

    const setCache = (id: string, username: string): void => {
        sessionStorage.setItem(ID_KEY, id)
        sessionStorage.setItem(USER_KEY, username)
    }

    return {
        setSession: saveSession,
        session: getSession()
    }
}
