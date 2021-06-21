import { BASE_URL, DEFAULT_HEADER } from '../utils'

const USER_URL = `${BASE_URL}/user`

const login = (session: ISession): Promise<ISession> => {
    return fetch(`${USER_URL}/login`, {
        method: 'POST',
        headers: DEFAULT_HEADER,
        body: JSON.stringify(session)
    })
    .then(data => data.json())
}

const updatePassword = (username: string, password: string, newPassword: string): Promise<number> => {
    return fetch(`${USER_URL}`, {
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

const updateUser = (username: string, password: string, newUsername: string): Promise<number> => {
    return fetch(`${USER_URL}`, {
        method: 'PUT',
        headers: DEFAULT_HEADER,
        body: JSON.stringify({
            username: username,
            password: password,
            newUsername: newUsername
        })
    })
    .then(data => data.status)
}

const exists = (username: String): Promise<number> => {
    return fetch(`${USER_URL}/${username}/exists`, {
        method: 'GET',
        headers: DEFAULT_HEADER
    })
    .then(data => data.status)
}

const USER_API = {
    login: login,
    updatePassword: updatePassword,
    updateUser: updateUser,
    exists: exists
}

export default USER_API
