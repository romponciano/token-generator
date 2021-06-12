import React, { useState } from 'react'
import styled from 'styled-components'

const NOTIFICATION_TYPE = {
    DANGER: 'danger',
    SUCCESS: 'success',
    WARN: 'warning'
}

const NotificationMessage: React.FC<{
    message: string, 
    setMessage: (value: string) => unknown, 
    type: string
}> = ({message, setMessage, type}) => {  

    const fullClass = `notification alert alert-${type}`

    return(
        <>
            {message ? 
                <StyledNotification>
                    <div className={fullClass}>
                        <p>{message}</p>
                        <i className="fas fa-times" onClick={() => setMessage(undefined)} />
                    </div>
                </StyledNotification>
            : null }
        </>
    )
}

export {
    NotificationMessage,
    NOTIFICATION_TYPE
}

const StyledNotification = styled.div`
    position: absolute;
    zIndex: 1000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    boxShadow: 4px 4px 10px -4px rgba(0,0,0,0.58);

    .alert {
        height: 45px;
        align-items: center;
        margin: 0;
        padding: 0;
        margin: 0;
        display: flex;
    }

    p {
        margin: 0;
        padding: 15px;
    }

    i {
        cursor: pointer;
        margin-right: 15px;
    }
`
