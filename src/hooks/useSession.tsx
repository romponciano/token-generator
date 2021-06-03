import { useState } from "react"
import USER_API from "../api/users"

export default function useSession() {
    const KEY = 'session'
    
    const getSession = (): ISession => {
        const token = sessionStorage.getItem(KEY)
        if(token) return session    
        saveSession(undefined)
        return undefined
    }

    const saveSession = async (session: ISession) => {
        const token = await USER_API.login(session)
        if(typeof token == 'string') {
            sessionStorage.setItem(KEY, token)
            setSession(session)
        } else {
            sessionStorage.removeItem(KEY)
            setSession(undefined)
            throw 'Bad request'
        }
    }

    const [session, setSession] = useState<ISession | undefined>(undefined)

    return {
        setSession: saveSession,
        session: getSession()
    }
}
