import { sha256 } from 'js-sha256'
import React, { useState } from 'react'
import styled from 'styled-components'
import USER_API from '../../api/users'
import { NotificationMessage, NOTIFICATION_TYPE } from '../../components/notification'

const NewPassword: React.FC<{
    session: ISession
}> = ({ session }) => {
    
    const [password, setPassword] = useState<string>()
    const [editPassword, setEditPassword] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    
    const [newPassword, setNewPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [isPasswordCorrect, setIsPasswordCorret] = useState<boolean>(false)

    const [notification, setNotification] = useState<{message: string, type: string}>()

    const updatePassword = (): void => {
        USER_API.updatePassword(session.username, sha256(password), sha256(newPassword))
            .then(res => {
                if(res == 200) {
                    setEditPassword(false)
                    setNotification({
                        message: "Password updated successfully! :)",
                        type: NOTIFICATION_TYPE.SUCCESS
                    })
                } else if(400) {
                    setNotification({
                        message: "Incorrect password :(",
                        type: NOTIFICATION_TYPE.DANGER
                    })
                } else {
                    setNotification({
                        message: "We couldn't update your password. Please try again later :(",
                        type: NOTIFICATION_TYPE.DANGER
                    })
                }
            })
    }

    const setNotificationMessage = (message: string) => {
        setNotification({message: message, type: notification.type})
    }

    const cancelUpdatePassword = (): void => {
        setPassword(undefined)
        setEditPassword(false)
        setNewPassword(undefined)
        setConfirmPassword(undefined)
        setIsPasswordCorret(false)
        setNotificationMessage(undefined)
    }

    return (
        <>
            <NotificationMessage {...notification} 
                setMessage={setNotificationMessage} />
            <div className="form-group row">
                <label className="col-sm-5 col-form-label">Password</label>
                <div className="col-sm-7">
                    <div className="input-group">
                        <input 
                            type={showPassword ? "text" : "password"}
                            readOnly={!editPassword}
                            className="form-control" 
                            placeholder="Password" 
                            onChange={e => setPassword(e.target.value)} 
                        />

                        <ActionIcon className="input-group-text">
                            <i 
                                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} 
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </ActionIcon>

                        {!editPassword && 
                            <ActionIcon className="input-group-text">
                                <i 
                                    className="far fa-edit"
                                    onClick={() => setEditPassword(true)}
                                />
                            </ActionIcon>
                        }
                    </div>
                </div>
            </div>

            {editPassword && 
                <>
                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label">New password</label>
                        <div className="col-sm-6">
                            <input 
                                type={showPassword ? "text" : "password"}
                                className="form-control" 
                                placeholder="New password" 
                                onChange={e => setNewPassword(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Confirm password</label>
                        <div className="col-sm-6">
                            <input 
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                className={!isPasswordCorrect && confirmPassword ? "form-control is-invalid" : "form-control"}
                                placeholder="Confirm password" 
                                onChange={e => {
                                    const confirm = e.target.value
                                    setConfirmPassword(confirm)
                                    if(confirm != newPassword) setIsPasswordCorret(false)
                                    else setIsPasswordCorret(true) 
                                }}
                            />
                            <label className="invalid-feedback" htmlFor="confirmPassword">
                                It doesn't match
                            </label>
                        </div>
                    </div>

                    <FinishButtons>
                        <button type="button" 
                            disabled={!isPasswordCorrect || password == undefined} 
                            className="btn btn-primary"
                            onClick={() => updatePassword()}
                        >
                            Update
                        </button>
                        <button type="button" 
                            className="btn btn-secondary mx-2" 
                            onClick={() => cancelUpdatePassword()}
                        >
                            Cancel
                        </button>
                    </FinishButtons>
                </>
            }
        </>
    )
}

export default NewPassword

const ActionIcon = styled.span`
    i {
        cursor: pointer;
    }
`

const FinishButtons = styled.div`
    margin-top: 5px;
    margin-right: 35px;
    float: right;
`
