import React from 'react'
import styled from 'styled-components'

const NOTIFICATION_TYPE = {
    DANGER: 'danger',
    SUCCESS: 'success',
    WARN: 'warning'
}

const Notification: React.FC<{message: string, type: string}> = ({message, type}) => {  
    const fullClass = `notification alert alert-${type}`

    return(
        <>
            {message ? 
                <StyledNotification>
                    <div className={fullClass}><p>{message}</p></div>
                </StyledNotification>
            : null }
        </>
    )
}

export {
    Notification,
    NOTIFICATION_TYPE
}

const StyledNotification = styled.div`
    position: absolute;
    zIndex: 500;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    boxShadow: 4px 4px 10px -4px rgba(0,0,0,0.58);
`
