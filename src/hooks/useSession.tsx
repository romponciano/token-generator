import { useState } from "react"
import USER_API from "../api/users"

export default function useSession() {
    const USER_KEY = 'user'
    const PASS_KEY = 'pass'
    
    const getSession = (): ISession => {
        const user = sessionStorage.getItem(USER_KEY)
        const pass = sessionStorage.getItem(PASS_KEY)
        if(user && pass) {
            const s: ISession = {username: user, password: pass}
            saveSession(s)
            return s
        }
        saveSession(undefined)
        return undefined
    }

    const saveSession = async (session: ISession) => {
        const token = await USER_API.login(session)
        if(typeof token == 'string' || typeof token == 'number') {
            sessionStorage.setItem(USER_KEY, session.username)
            sessionStorage.setItem(PASS_KEY, session.password)
            setSession(session)
        } else {
            sessionStorage.removeItem(USER_KEY)
            sessionStorage.removeItem(PASS_KEY)
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
