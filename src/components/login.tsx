import React, { useState } from 'react'
import { sha256 } from 'js-sha256'

const Login: 
    React.FC<{ setSession: (session: ISession) => Promise<void>}> = 
    ({ setSession }): JSX.Element => {

    const login = () => {
        setSession({ username: username, password: sha256(password) })
        .catch(e => {
            window.alert("Invalid username/password")
        })
    }

    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()

    return (
        <>
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit" className="btn btn-primary" 
                        onClick={e => {
                            e.preventDefault()
                            login()
                        }}
                    >
                        Login
                    </button>
                </div>
            </form>
        </>
    )
}

export default Login
