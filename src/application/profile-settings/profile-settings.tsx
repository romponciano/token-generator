import { sha256 } from 'js-sha256'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import USER_API from '../../api/users'
import ActionIcon from '../../components/action-icon'
import FinishButtons from '../../components/finish-buttons'
import Modal from '../../components/modal'
import { NotificationMessage, NOTIFICATION_TYPE } from '../../components/notification'
import NewPassword from './new-password'

const ProfileSettings: React.FC<{ 
    session: ISession, 
    setSession: (session: ISession | undefined) => Promise<void> 
}> = ({session, setSession}) => {

    const [username, setUsername] = useState<string>(session.username)
    const [editUsername, setEditUsername] = useState<boolean>(false)

    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [password, setPassword] = useState<string>()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [notification, setNotification] = useState<{message: string, type: string}>({message: '' , type: NOTIFICATION_TYPE.SUCCESS})

    const updateUser = () => {
        USER_API.updateUser(session.username, sha256(password), username)
            .then(res => {
                if(res == 200) {
                    setSession({ username: username, password: password })
                    setNotification({
                        message: "Settings updated successfully! :)",
                        type: NOTIFICATION_TYPE.SUCCESS
                    })
                } else if(400) {
                    setNotification({
                        message: "Incorrect password :(",
                        type: NOTIFICATION_TYPE.DANGER
                    })
                } else {
                    setNotification({
                        message: "We couldn't update your settings. Please try again later :(",
                        type: NOTIFICATION_TYPE.DANGER
                    })
                }
            })
    }

    return (
        <BaseLayout>

            <NotificationMessage {...notification} 
                setMessage={msg => setNotification({message: msg, type: notification.type})} 
            />
        
            <Modal 
                show={showConfirmation}
                setShow={setShowConfirmation}
                title={<h5>Type your password to confirm the update</h5>}
                body={
                    <div className="input-group">
                        <input 
                            type={showPassword ? "text" : "password"}
                            className="form-control" 
                            placeholder="Password" 
                            onChange={e => setPassword(e.target.value)} 
                        />

                        <span className="input-group-text">
                            <ActionIcon 
                                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} 
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </span>
                    </div>
                }
                footer={
                    <FinishButtons 
                        confirm={{
                            label: 'Save',
                            disabled: (password != undefined),
                            onClick: () => updateUser()
                        }}
                        cancel={{
                            label: 'Cancel',
                            disabled: false,
                            onClick: () => setShowConfirmation(false)
                        }}
                    />
                }
            />

            <Row className="form-group row">
                <label className="col-sm-5 col-form-label">Username</label>
                <div className="col-sm-7">
                    <div className="input-group">
                        <input 
                            type="text" 
                            readOnly={!editUsername}
                            className="form-control" 
                            placeholder="username"
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                        />
                    
                        <span className="input-group-text">
                            <ActionIcon 
                                className={editUsername ? "far fa-check-square" : "far fa-edit"}
                                onClick={() => setEditUsername(!editUsername)}
                            />
                        </span>
                    </div>
                </div>
            </Row>

            <NewPassword session={session} />

            <FinishButtons 
                confirm={{
                    label: 'Save',
                    disabled: false,
                    onClick: () => setShowConfirmation(true)
                }}
                cancel={{
                    label: 'Cancel',
                    disabled: false,
                    onClick: () => history.go(0)
                }}
            />
        </BaseLayout>
    )
}

export default ProfileSettings

const BaseLayout = styled.div`
    max-width: 450px;
`

const Row = styled.div`
    margin-bottom: 15px;
    margin-top: 15px;
`
