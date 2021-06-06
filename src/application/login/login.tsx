import React, { useState } from 'react'
import { sha256 } from 'js-sha256'
import styled from 'styled-components'
import { Notification, NOTIFICATION_TYPE } from '../../components/notification'

const Login: 
    React.FC<{ setSession: (session: ISession) => Promise<void>}> = 
    ({ setSession }): JSX.Element => {

    const login = () => {
        setSession({ username: username, password: sha256(password) })
        .catch(e => {
            setErrorMessage("Invalid username/password")
        })
    }

    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<string>()

    return (
        <StyledLogin>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>RPG<br/> Token Generator</h2>
                    <p><a href="https://www.linkedin.com/in/romuloponciano/">romponciano</a></p>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form>
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" className="form-control" placeholder="User Name" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <Notification type={NOTIFICATION_TYPE.DANGER} message={errorMessage} />
                            <ActionButtons>
                                <button type="submit" className="btn btn-black" 
                                    onClick={e => {
                                        e.preventDefault()
                                        login()
                                    }}
                                >
                                    Login
                                </button>
                                <button type="submit" className="btn btn-secondary"
                                    onClick={() => window.alert("Register disabled atm")}
                                >
                                    Register
                                </button>
                            </ActionButtons>
                        </form>
                    </div>
                </div>
            </div>
        </StyledLogin>
    )
}

export default Login

const ActionButtons = styled.div`
    margin-top: 15px;
    display: flex;
    column-gap: 10px;
`

const StyledLogin = styled.div`
    .main-head{
        height: 150px;
        background: #FFF;
    
    }

    .sidenav {
        height: 100%;
        background-color: #000;
        overflow-x: hidden;
        padding-top: 20px;
    }

    .main {
        padding: 0px 10px;
    }

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
    }

    @media screen and (max-width: 450px) {
        .login-form{
            margin-top: 10%;
        }

        .register-form{
            margin-top: 10%;
        }
    }

    @media screen and (min-width: 768px){
        .main{
            margin-left: 40%; 
        }

        .sidenav{
            width: 40%;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
        }

        .login-form{
            margin-top: 80%;
        }

        .register-form{
            margin-top: 20%;
        }
    }

    .login-main-text{
        margin-top: 20%;
        padding: 60px;
        color: #fff;
    }

    .login-main-text h2{
        font-weight: 300;
    }

    .btn-black{
        background-color: #000 !important;
        color: #fff;
    }
`