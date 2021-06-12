import React, { useState } from 'react'
import styled from 'styled-components'
import NewPassword from './new-password'

const ProfileSettings: React.FC<{ 
    session: ISession, 
    setSession: (session: ISession | undefined) => Promise<void> 
}> = ({session, setSession}) => {

        const [username, setUsername] = useState<string>(session.username)
        const [editUsername, setEditUsername] = useState<boolean>(false)

        return (
            <BaseLayout>
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
                        
                            <ActionIcon className="input-group-text">
                                <i 
                                    className={editUsername ? "far fa-check-square" : "far fa-edit"}
                                    onClick={() => setEditUsername(!editUsername)}
                                />
                            </ActionIcon>
                        </div>
                    </div>
                </Row>

                <NewPassword session={session} />

            </BaseLayout>
        )
}

export default ProfileSettings

const BaseLayout = styled.div`
    max-width: 450px;
`

const Row = styled.div`
    margin-bottom: 15px;
`

const ActionIcon = styled.span`
    i {
        cursor: pointer;
    }
`
