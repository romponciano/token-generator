import { BASE_URL, DEFAULT_HEADER } from '../utils'

const USERS_URL = 'user'

const login = (session: ISession): Promise<unknown> => {
    return fetch(`${BASE_URL}/${USERS_URL}/login`, {
        method: 'POST',
        headers: DEFAULT_HEADER,
        body: JSON.stringify(session)
    })
    .then(data => data.json())
}

const updatePassword = (
    username: string, 
    password: string, 
    newPassword: string
): Promise<number> => {
    return fetch(`${BASE_URL}/${USERS_URL}`, {
        method: 'PUT',
        headers: DEFAULT_HEADER,
        body: JSON.stringify({
            username: username,
            password: password,
            newPassword: newPassword
        })
    })
    .then(data => data.status)
}

const USER_API = {
    login: login,
    updatePassword: updatePassword
}

export default USER_API
