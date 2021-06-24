import React, { useEffect, useState } from 'react'
import { NotificationMessage, NOTIFICATION_TYPE } from './notification'

const LoadingButton: React.FC<{
    label: string,
    onClick: () => Promise<unknown>,
    success?: string,
    onSuccess?: (response: unknown) => unknown,
    fail?: string,
    onFail?: (error: unknown) => unknown,
    className?: string,
    isDisabled?: boolean
}> = ({ 
    label, 
    onClick, 
    success, 
    onSuccess = () => {},
    fail, 
    onFail = () => {},
    className, 
    isDisabled = false 
}): JSX.Element => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [notification, setNotification] = useState<{msg: string, type: string}>({msg: undefined, type: undefined})

    useEffect(() => {
        return setIsLoading(false)
    }, [])

    return (
        <>
            <NotificationMessage  
                message={notification.msg}
                setMessage={(value) => setNotification({msg: value, type: notification.type})}
                type={notification.type}
            />
            
            <button 
                type="button"
                disabled={isLoading || isDisabled}
                className={className ? className : "btn btn-primary"}
                onClick={() => {
                    setIsLoading(true)
                    onClick()
                        .then((response) => {
                            if(success)
                                setNotification({msg: success, type: NOTIFICATION_TYPE.SUCCESS})
                            onSuccess(response)
                        })
                        .catch((error) => {
                            if(fail)
                                setNotification({msg: fail, type: NOTIFICATION_TYPE.DANGER})
                            onFail(error)
                        })
                        .finally(() => setIsLoading(false))
                }}
            >
                {isLoading 
                    ? <i className="fas fa-spinner fa-spin" />
                    : `${label}`
                }
            </button>
        </>
    )
}

export default LoadingButton
