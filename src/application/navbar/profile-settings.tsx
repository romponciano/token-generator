import React, { useState } from 'react'

const ProfileSettings: React.FC<{ 
    session: ISession, 
    setSession: (session: ISession | undefined) => Promise<void> }> = 
    ({session, setSession}) => {

        const [username, setUsername] = useState<string>(session.username)
        const [password, setPassword] = useState<string>(session.password)
        const [newPassword, setNewPassword] = useState<string>()
        const [confirmPassword, setConfirmPassword] = useState<string>()

        return (
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={username} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">New password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="New password" onChange={e => setNewPassword(e.target.value)} />
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Confirm password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                </div>
            </form>
        )
}

export default ProfileSettings
