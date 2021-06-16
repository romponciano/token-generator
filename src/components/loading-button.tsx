import React, { useEffect, useState } from 'react'

const LoadingButton: React.FC<{
    label: string,
    onClick: () => Promise<unknown>
    className?: string
}> = ({ label, onClick, className }): JSX.Element => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        return setIsLoading(false)
    }, [])

    return (
        <button 
            type="button"
            disabled={isLoading}
            className={className ? className : "btn btn-primary"}
            onClick={() => {
                setIsLoading(true)
                onClick().finally(() => setIsLoading(false))
            }}
        >
            {isLoading 
                ? <i className="fas fa-spinner fa-spin" />
                : `${label}`
            }
        </button>
    )
}

export default LoadingButton
