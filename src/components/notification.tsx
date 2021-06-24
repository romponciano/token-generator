import React, { useEffect, useState } from 'react'
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

    if(message && type == NOTIFICATION_TYPE.SUCCESS) {
        setTimeout(() => {
            if(message) setMessage(undefined)
        }, 2500)
    }

    return(
        <>
            {message ? 
                <StyledNotification id="notification">
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
    z-index: 5000;
    right: 1%;
    top: 1;

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
