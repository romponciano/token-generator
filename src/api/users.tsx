import { BASE_URL } from '../utils'

const USERS_URL = 'user'

const login = (session: ISession) => {
    return fetch(`${BASE_URL}/${USERS_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session)
    })
    .then(data => data.json())
}

const USER_API = {
    login: login
}

export default USER_API
