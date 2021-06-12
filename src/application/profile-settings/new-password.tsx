import { sha256 } from 'js-sha256'
import React, { useState } from 'react'
import styled from 'styled-components'
import USER_API from '../../api/users'
import ActionIcon from '../../components/action-icon'
import FinishButtons from '../../components/finish-buttons'
import Modal from '../../components/modal'
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
            <NotificationMessage {...notification} setMessage={setNotificationMessage} />

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

                        <span className="input-group-text">
                            <ActionIcon 
                                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} 
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </span>

                        {!editPassword && 
                            <span className="input-group-text">
                                <ActionIcon 
                                    className="far fa-edit"
                                    onClick={() => setEditPassword(true)}
                                />
                            </span>
                        }
                    </div>
                </div>
            </div>

            <Modal
                show={editPassword}
                setShow={cancelUpdatePassword}
                title={<h5>Edit password</h5>}
                body={
                    <>
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label">Password</label>
                            <div className="col-sm-7">
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
                            </div>
                        </div>

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
                    </>
                }

                footer={
                    <FinishButtons 
                        confirm={{
                            label: 'Update',
                            disabled: !isPasswordCorrect || password == undefined,
                            onClick: () => updatePassword()
                        }}
                        
                        cancel={{
                            label: 'Cancel',
                            disabled: false,
                            onClick: () => cancelUpdatePassword()
                        }}
                    />
                }
             />
        </>
    )
}

export default NewPassword
